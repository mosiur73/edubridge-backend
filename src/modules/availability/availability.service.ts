import { prisma } from "../../lib/prisma";

const createAvailability = async (userId: string, payload: any) => {
  const { dayOfWeek, startTime, endTime } = payload;

  // Get tutor profile
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }

  // Validate day of week (0-6)
  if (dayOfWeek < 0 || dayOfWeek > 6) {
    throw new Error("Day of week must be between 0 (Sunday) and 6 (Saturday)");
  }

  // Validate time format
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
    throw new Error("Invalid time format. Use HH:MM format (e.g., 09:00)");
  }

  // Check if end time is after start time
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  if (endMinutes <= startMinutes) {
    throw new Error("End time must be after start time");
  }

  // Check for overlapping slots
  const overlappingSlot = await prisma.availability.findFirst({
    where: {
      tutorId: tutorProfile.id,
      dayOfWeek,
      isActive: true,
      OR: [
        {
          AND: [{ startTime: { lte: startTime } }, { endTime: { gt: startTime } }],
        },
        {
          AND: [{ startTime: { lt: endTime } }, { endTime: { gte: endTime } }],
        },
      ],
    },
  });

  if (overlappingSlot) {
    throw new Error("This time slot overlaps with an existing availability slot");
  }

  // Create availability
  const availability = await prisma.availability.create({
    data: {
      tutorId: tutorProfile.id,
      dayOfWeek,
      startTime,
      endTime,
      isActive: true,
    },
  });

  return availability;
};

const getMyAvailability = async (userId: string) => {
  // Get tutor profile
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }

  // Get availability slots
  const availability = await prisma.availability.findMany({
    where: { tutorId: tutorProfile.id },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  // Group by day of week
  const groupedByDay = availability.reduce((acc: any, slot) => {
    const day = slot.dayOfWeek;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(slot);
    return acc;
  }, {});

  return {
    slots: availability,
    groupedByDay,
  };
};

const updateAvailability = async (availabilityId: string, userId: string, data: any) => {
  const { dayOfWeek, startTime, endTime, isActive } = data;

  // Get availability slot
  const slot = await prisma.availability.findUnique({
    where: { id: availabilityId },
    include: {
      tutor: true,
    },
  });

  if (!slot) {
    throw new Error("Availability slot not found");
  }

  // Check if slot belongs to this tutor
  if (slot.tutor.userId !== userId) {
    throw new Error("You do not have permission to update this availability slot");
  }

  // Validate data if provided
  if (dayOfWeek !== undefined && (dayOfWeek < 0 || dayOfWeek > 6)) {
    throw new Error("Day of week must be between 0 (Sunday) and 6 (Saturday)");
  }

  if (startTime || endTime) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (startTime && !timeRegex.test(startTime)) {
      throw new Error("Invalid start time format. Use HH:MM format");
    }
    if (endTime && !timeRegex.test(endTime)) {
      throw new Error("Invalid end time format. Use HH:MM format");
    }

    // Check if end time is after start time
    const finalStartTime = startTime || slot.startTime;
    const finalEndTime = endTime || slot.endTime;

    const [startHour, startMin] = finalStartTime.split(":").map(Number);
    const [endHour, endMin] = finalEndTime.split(":").map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    if (endMinutes <= startMinutes) {
      throw new Error("End time must be after start time");
    }
  }

  // Update availability
  const updatedSlot = await prisma.availability.update({
    where: { id: availabilityId },
    data: {
      dayOfWeek: dayOfWeek !== undefined ? dayOfWeek : slot.dayOfWeek,
      startTime: startTime || slot.startTime,
      endTime: endTime || slot.endTime,
      isActive: isActive !== undefined ? isActive : slot.isActive,
    },
  });

  return updatedSlot;
};

const deleteAvailability = async (availabilityId: string, userId: string) => {
  // Get availability slot
  const slot = await prisma.availability.findUnique({
    where: { id: availabilityId },
    include: {
      tutor: true,
    },
  });

  if (!slot) {
    throw new Error("Availability slot not found");
  }

  // Check if slot belongs to this tutor
  if (slot.tutor.userId !== userId) {
    throw new Error("You do not have permission to delete this availability slot");
  }

  // Delete availability
  await prisma.availability.delete({
    where: { id: availabilityId },
  });

  return true;
};

const toggleAvailability = async (availabilityId: string, userId: string) => {
  // Get availability slot
  const slot = await prisma.availability.findUnique({
    where: { id: availabilityId },
    include: {
      tutor: true,
    },
  });

  if (!slot) {
    throw new Error("Availability slot not found");
  }

  // Check if slot belongs to this tutor
  if (slot.tutor.userId !== userId) {
    throw new Error("You do not have permission to update this availability slot");
  }

  // Toggle isActive
  const updatedSlot = await prisma.availability.update({
    where: { id: availabilityId },
    data: {
      isActive: !slot.isActive,
    },
  });

  return updatedSlot;
};

export const availabilityService = {
  createAvailability,
  getMyAvailability,
  updateAvailability,
  deleteAvailability,
  toggleAvailability,
};