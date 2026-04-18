import Stripe from "stripe";
import { prisma } from "../../lib/prisma";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// ✅ Step 1: Create booking (PENDING) + Stripe PaymentIntent
const createPaymentIntent = async (studentId: string, payload: any) => {
  const { tutorId, subject, date, startTime, endTime, duration, price, notes, meetingLink } = payload;

  // Validate tutor
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorId },
    include: { user: { select: { name: true } } },
  });

  if (!tutor) throw new Error("Tutor not found");
  if (!tutor.isAvailable) throw new Error("Tutor is not available");

  // Check past date
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (bookingDate < today) throw new Error("Cannot book sessions in the past");

  // Check conflict
  const conflict = await prisma.booking.findFirst({
    where: {
      tutorId,
      date: bookingDate,
      status: { notIn: ["CANCELLED"] },
      OR: [
        { AND: [{ startTime: { lte: startTime } }, { endTime: { gt: startTime } }] },
        { AND: [{ startTime: { lt: endTime } }, { endTime: { gte: endTime } }] },
      ],
    },
  });

  if (conflict) throw new Error("This time slot is already booked");

  // Create Stripe PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(price * 100), // cents
    currency: "usd",
    metadata: {
      studentId,
      tutorId,
      subject,
      date: date.toString(),
      startTime,
      endTime,
    },
  });

  // Create booking with PENDING status
  const booking = await prisma.booking.create({
    data: {
      studentId,
      tutorId,
      subject,
      date: bookingDate,
      startTime,
      endTime,
      duration,
      price,
      notes,
      meetingLink,
      status: "PENDING",
      paymentStatus: "UNPAID",
      paymentIntentId: paymentIntent.id,
    },
  });

  return {
    bookingId: booking.id,
    clientSecret: paymentIntent.client_secret,
    amount: price,
  };
};

// ✅ Step 2: Confirm payment → booking CONFIRMED
const confirmPayment = async (bookingId: string, studentId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  }) ;

  if (!booking) throw new Error("Booking not found");
  if (booking.studentId !== studentId) throw new Error("Unauthorized");
  if (!booking.paymentIntentId) throw new Error("No payment intent found");

  // Verify with Stripe
  const paymentIntent = await stripe.paymentIntents.retrieve(booking.paymentIntentId);

  if (paymentIntent.status !== "succeeded") {
    throw new Error("Payment not completed");
  }

  // Update booking
  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "CONFIRMED",
      paymentStatus: "PAID",
    },
    include: {
      student: { select: { id: true, name: true, email: true } },
      tutor: { include: { user: { select: { id: true, name: true, email: true } } } },
    },
  });

  return updated;
};

// ✅ Cancel pending booking
const cancelPendingBooking = async (bookingId: string, studentId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  }) ;

  if (!booking) throw new Error("Booking not found");
  if (booking.studentId !== studentId) throw new Error("Unauthorized");

  // Cancel Stripe PaymentIntent if exists
  if (booking.paymentIntentId) {
    try {
      await stripe.paymentIntents.cancel(booking.paymentIntentId);
    } catch {
      // Already cancelled or succeeded — ignore
    }
  }

  return await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });
};

export const paymentService = {
  createPaymentIntent,
  confirmPayment,
  cancelPendingBooking,
};