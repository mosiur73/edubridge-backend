// src/app.ts
import express from "express";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  STUDENT\n  TUTOR\n  ADMIN\n}\n\nenum BookingStatus {\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\nmodel User {\n  id            String  @id @default(cuid())\n  name          String\n  email         String  @unique\n  emailVerified Boolean @default(false)\n  image         String?\n  role          Role    @default(STUDENT)\n\n  // \u2705 Ban fields\n  banned     Boolean   @default(false)\n  banReason  String?\n  banExpires DateTime?\n\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n  sessions  Session[]\n  accounts  Account[]\n\n  tutorProfile TutorProfile?\n  bookings     Booking[]     @relation("StudentBookings")\n  reviews      Review[]      @relation("StudentReviews")\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id @default(cuid())\n  expiresAt DateTime\n  token     String   @unique\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id         String @id @default(cuid())\n  accountId  String\n  providerId String\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  password              String?\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id @default(cuid())\n  identifier String\n  value      String\n  expiresAt  DateTime\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel TutorProfile {\n  id        String   @id @default(cuid())\n  userId    String   @unique\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  bio       String?  @db.Text\n  headline  String?\n  subjects  String[]\n  languages String[]\n  education String?\n\n  hourlyRate    Float\n  experience    Int      @default(0)\n  categoryIds   String[]\n  rating        Float    @default(0) @db.DoublePrecision\n  totalReviews  Int      @default(0)\n  totalSessions Int      @default(0)\n  isAvailable   Boolean  @default(true)\n\n  bookings     Booking[]\n  reviews      Review[]\n  availability Availability[]\n  createdAt    DateTime       @default(now())\n  updatedAt    DateTime       @updatedAt\n\n  @@index([userId])\n  @@index([rating])\n  @@map("tutor_profile")\n}\n\nmodel Category {\n  id          String   @id @default(cuid())\n  name        String   @unique\n  slug        String   @unique\n  description String?  @db.Text\n  icon        String?\n  isActive    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  @@map("category")\n}\n\nmodel Booking {\n  id          String        @id @default(cuid())\n  studentId   String\n  student     User          @relation("StudentBookings", fields: [studentId], references: [id], onDelete: Cascade)\n  tutorId     String\n  tutor       TutorProfile  @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n  subject     String\n  date        DateTime\n  startTime   String\n  endTime     String\n  duration    Int?\n  status      BookingStatus @default(CONFIRMED)\n  price       Float\n  notes       String?       @db.Text\n  meetingLink String?\n\n  review    Review?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([studentId])\n  @@index([tutorId])\n  @@index([date])\n  @@index([status])\n  @@map("booking")\n}\n\nmodel Review {\n  id        String       @id @default(cuid())\n  bookingId String       @unique\n  booking   Booking      @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n  tutorId   String\n  tutor     TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n  studentId String\n  student   User         @relation("StudentReviews", fields: [studentId], references: [id], onDelete: Cascade)\n  rating    Int\n  comment   String?      @db.Text\n  createdAt DateTime     @default(now())\n  updatedAt DateTime     @updatedAt\n\n  @@index([tutorId])\n  @@index([studentId])\n  @@index([rating])\n  @@map("review")\n}\n\nmodel Availability {\n  id      String       @id @default(cuid())\n  tutorId String\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n\n  dayOfWeek Int\n  startTime String\n  endTime   String\n  isActive  Boolean  @default(true)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([tutorId])\n  @@index([dayOfWeek])\n  @@map("availability")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"banned","kind":"scalar","type":"Boolean"},{"name":"banReason","kind":"scalar","type":"String"},{"name":"banExpires","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"StudentBookings"},{"name":"reviews","kind":"object","type":"Review","relationName":"StudentReviews"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"password","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"bio","kind":"scalar","type":"String"},{"name":"headline","kind":"scalar","type":"String"},{"name":"subjects","kind":"scalar","type":"String"},{"name":"languages","kind":"scalar","type":"String"},{"name":"education","kind":"scalar","type":"String"},{"name":"hourlyRate","kind":"scalar","type":"Float"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"categoryIds","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"totalReviews","kind":"scalar","type":"Int"},{"name":"totalSessions","kind":"scalar","type":"Int"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutorProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"tutor_profile"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"category"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"User","relationName":"StudentBookings"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"BookingToTutorProfile"},{"name":"subject","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"price","kind":"scalar","type":"Float"},{"name":"notes","kind":"scalar","type":"String"},{"name":"meetingLink","kind":"scalar","type":"String"},{"name":"review","kind":"object","type":"Review","relationName":"BookingToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"booking"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"User","relationName":"StudentReviews"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"review"},"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"AvailabilityToTutorProfile"},{"name":"dayOfWeek","kind":"scalar","type":"Int"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"availability"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "STUDENT",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      accessType: "offline",
      prompt: "select_account consent",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/app.ts
import cors from "cors";

// src/modules/tutor/tutor.routes.ts
import { Router } from "express";

// src/middleware/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role
        // emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
var auth_default = auth2;

// src/modules/tutor/tutor.service.ts
var getAllTutors = async (filters) => {
  const where = {
    isAvailable: true
  };
  if (filters.categoryId) {
    where.categoryIds = {
      has: filters.categoryId
    };
  }
  if (filters.minRate || filters.maxRate) {
    where.hourlyRate = {};
    if (filters.minRate) where.hourlyRate.gte = filters.minRate;
    if (filters.maxRate) where.hourlyRate.lte = filters.maxRate;
  }
  if (filters.search) {
    where.OR = [
      {
        user: {
          name: { contains: filters.search, mode: "insensitive" }
        }
      },
      { bio: { contains: filters.search, mode: "insensitive" } },
      { headline: { contains: filters.search, mode: "insensitive" } },
      { subjects: { has: filters.search } }
    ];
  }
  const tutors = await prisma.tutorProfile.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      reviews: {
        select: { rating: true }
      },
      _count: {
        select: {
          reviews: true,
          bookings: true
        }
      }
    },
    orderBy: {
      rating: "desc"
    }
  });
  const tutorsWithRating = tutors.map((tutor) => {
    const avgRating = tutor.reviews.length > 0 ? tutor.reviews.reduce((sum, r) => sum + r.rating, 0) / tutor.reviews.length : 0;
    return {
      ...tutor,
      averageRating: Number(avgRating.toFixed(1)),
      totalReviews: tutor._count.reviews,
      totalBookings: tutor._count.bookings
    };
  });
  if (filters.minRating) {
    return tutorsWithRating.filter((t) => t.averageRating >= filters.minRating);
  }
  return tutorsWithRating;
};
var getTutorById = async (id) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      availability: {
        orderBy: { dayOfWeek: "asc" }
      },
      reviews: {
        include: {
          student: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      },
      _count: {
        select: {
          reviews: true,
          bookings: true
        }
      }
    }
  });
  if (!tutor) {
    throw new Error("Tutor not found");
  }
  const avgRating = tutor.reviews.length > 0 ? tutor.reviews.reduce((sum, r) => sum + r.rating, 0) / tutor.reviews.length : 0;
  return {
    ...tutor,
    averageRating: Number(avgRating.toFixed(1)),
    totalReviews: tutor._count.reviews,
    totalBookings: tutor._count.bookings
  };
};
var getTutorProfileByUserId = async (userId) => {
  return await prisma.tutorProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      availability: {
        orderBy: { dayOfWeek: "asc" }
      },
      _count: {
        select: {
          reviews: true,
          bookings: true
        }
      }
    }
  });
};
var createTutorProfile = async (userId, data) => {
  const {
    headline,
    bio,
    hourlyRate,
    experience,
    education,
    subjects,
    languages,
    categoryIds
  } = data;
  if (!headline || !hourlyRate) {
    throw new Error("Headline and hourly rate are required");
  }
  if (!subjects || subjects.length === 0) {
    throw new Error("At least one subject is required");
  }
  if (!languages || languages.length === 0) {
    throw new Error("At least one language is required");
  }
  const existingProfile = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (existingProfile) {
    throw new Error("Profile already exists. Use update endpoint instead.");
  }
  return await prisma.tutorProfile.create({
    data: {
      userId,
      headline,
      bio,
      hourlyRate: parseFloat(hourlyRate),
      experience: experience ? parseInt(experience) : 0,
      education,
      subjects: subjects || [],
      languages: languages || [],
      categoryIds: categoryIds || [],
      isAvailable: true
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      }
    }
  });
};
var updateTutorProfile = async (userId, data) => {
  const {
    headline,
    bio,
    hourlyRate,
    experience,
    education,
    subjects,
    languages,
    categoryIds
  } = data;
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (!tutorProfile) {
    return await createTutorProfile(userId, data);
  }
  return await prisma.tutorProfile.update({
    where: { userId },
    data: {
      ...headline && { headline },
      ...bio !== void 0 && { bio },
      ...hourlyRate && { hourlyRate: parseFloat(hourlyRate) },
      ...experience !== void 0 && { experience: parseInt(experience) },
      ...education !== void 0 && { education },
      ...subjects && { subjects },
      ...languages && { languages },
      ...categoryIds && { categoryIds }
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      }
    }
  });
};
var getTutorStats = async (userId) => {
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }
  const bookings = await prisma.booking.findMany({
    where: { tutorId: tutorProfile.id }
  });
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED").length;
  const completedBookings = bookings.filter((b) => b.status === "COMPLETED").length;
  const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED").length;
  const totalEarnings = bookings.filter((b) => b.status === "COMPLETED").reduce((sum, b) => sum + b.price, 0);
  return {
    totalBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    totalEarnings: Number(totalEarnings.toFixed(2)),
    rating: tutorProfile.rating,
    totalReviews: tutorProfile.totalReviews,
    totalSessions: tutorProfile.totalSessions
  };
};
var getTutorSessions = async (userId, status) => {
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }
  const where = {
    tutorId: tutorProfile.id
  };
  if (status) {
    where.status = status;
  }
  return await prisma.booking.findMany({
    where,
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      review: true
    },
    orderBy: {
      date: "desc"
    }
  });
};
var tutorService = {
  getAllTutors,
  getTutorById,
  getTutorProfileByUserId,
  createTutorProfile,
  updateTutorProfile,
  getTutorStats,
  getTutorSessions
};

// src/modules/tutor/tutor.controller.ts
var getAllTutors2 = async (req, res) => {
  try {
    const { categoryId, minRate, maxRate, search, minRating } = req.query;
    const filters = {};
    if (categoryId) filters.categoryId = categoryId;
    if (minRate) filters.minRate = parseFloat(minRate);
    if (maxRate) filters.maxRate = parseFloat(maxRate);
    if (search) filters.search = search;
    if (minRating) filters.minRating = parseFloat(minRating);
    const tutors = await tutorService.getAllTutors(filters);
    res.status(200).json({
      success: true,
      data: tutors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch tutors"
    });
  }
};
var getTutorById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await tutorService.getTutorById(id);
    res.status(200).json({
      success: true,
      data: tutor
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Tutor not found"
    });
  }
};
var getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await tutorService.getTutorProfileByUserId(userId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found"
      });
    }
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profile"
    });
  }
};
var createProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const payload = req.body;
    const profile = await tutorService.createTutorProfile(userId, payload);
    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create profile"
    });
  }
};
var updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const payload = req.body;
    const updatedProfile = await tutorService.updateTutorProfile(
      userId,
      payload
    );
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update profile"
    });
  }
};
var getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await tutorService.getTutorStats(userId);
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch stats"
    });
  }
};
var getMySessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;
    const sessions = await tutorService.getTutorSessions(userId, status);
    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch sessions"
    });
  }
};
var tutorController = {
  getAllTutors: getAllTutors2,
  getTutorById: getTutorById2,
  getMyProfile,
  createProfile,
  updateProfile,
  getStats,
  getMySessions
};

// src/modules/tutor/tutor.routes.ts
var router = Router();
router.get("/", tutorController.getAllTutors);
router.get("/profile", auth_default("TUTOR" /* TUTOR */), tutorController.getMyProfile);
router.put("/profile", auth_default("TUTOR" /* TUTOR */), tutorController.updateProfile);
router.post("/profile", auth_default("TUTOR" /* TUTOR */), tutorController.createProfile);
router.get("/stats", auth_default("TUTOR" /* TUTOR */), tutorController.getStats);
router.get("/sessions", auth_default("TUTOR" /* TUTOR */), tutorController.getMySessions);
router.get("/:id", tutorController.getTutorById);
var tutorRouter = router;

// src/modules/booking/booking.routes.ts
import { Router as Router2 } from "express";

// src/modules/booking/booking.service.ts
var createBooking = async (studentId, payload) => {
  const { tutorId, subject, date, startTime, endTime, duration, price, notes, meetingLink } = payload;
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorId }
  });
  if (!tutor) {
    throw new Error("Tutor not found");
  }
  if (!tutor.isAvailable) {
    throw new Error("Tutor is not available for bookings");
  }
  const bookingDate = new Date(date);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  if (bookingDate < today) {
    throw new Error("Cannot book sessions in the past");
  }
  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      tutorId,
      date: bookingDate,
      status: { not: "CANCELLED" },
      OR: [
        {
          AND: [{ startTime: { lte: startTime } }, { endTime: { gt: startTime } }]
        },
        {
          AND: [{ startTime: { lt: endTime } }, { endTime: { gte: endTime } }]
        }
      ]
    }
  });
  if (conflictingBooking) {
    throw new Error("This time slot is already booked");
  }
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
      status: "CONFIRMED"
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      tutor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      }
    }
  });
  return booking;
};
var getMyBookings = async (userId, userRole, status) => {
  let where = {};
  if (userRole === "STUDENT") {
    where.studentId = userId;
  } else if (userRole === "TUTOR") {
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId }
    });
    if (!tutorProfile) {
      throw new Error("Tutor profile not found");
    }
    where.tutorId = tutorProfile.id;
  }
  if (status) {
    where.status = status;
  }
  const bookings = await prisma.booking.findMany({
    where,
    orderBy: { date: "desc" },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      tutor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      },
      review: true
    }
  });
  return bookings;
};
var getBookingById = async (bookingId, userId, userRole) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      tutor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      },
      review: true
    }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  let hasAccess = false;
  if (userRole === "STUDENT" && booking.studentId === userId) {
    hasAccess = true;
  } else if (userRole === "TUTOR") {
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId }
    });
    if (tutorProfile && booking.tutorId === tutorProfile.id) {
      hasAccess = true;
    }
  } else if (userRole === "ADMIN") {
    hasAccess = true;
  }
  if (!hasAccess) {
    throw new Error("You do not have permission to view this booking");
  }
  return booking;
};
var markComplete = async (bookingId, userId) => {
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.tutorId !== tutorProfile.id) {
    throw new Error("You do not have permission to update this booking");
  }
  if (booking.status !== "CONFIRMED") {
    throw new Error("Only confirmed bookings can be marked as completed");
  }
  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "COMPLETED" },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      tutor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      }
    }
  });
  await prisma.tutorProfile.update({
    where: { id: tutorProfile.id },
    data: { totalSessions: { increment: 1 } }
  });
  return updatedBooking;
};
var cancelBooking = async (bookingId, userId, userRole) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  let hasPermission = false;
  if (userRole === "STUDENT" && booking.studentId === userId) {
    hasPermission = true;
  } else if (userRole === "TUTOR") {
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId }
    });
    if (tutorProfile && booking.tutorId === tutorProfile.id) {
      hasPermission = true;
    }
  }
  if (!hasPermission) {
    throw new Error("You do not have permission to cancel this booking");
  }
  if (booking.status === "CANCELLED") {
    throw new Error("Booking is already cancelled");
  }
  if (booking.status === "COMPLETED") {
    throw new Error("Cannot cancel completed bookings");
  }
  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      tutor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      }
    }
  });
  return updatedBooking;
};
var bookingService = {
  createBooking,
  getMyBookings,
  getBookingById,
  markComplete,
  cancelBooking
};

// src/modules/booking/booking.controller.ts
var createBooking2 = async (req, res) => {
  try {
    const studentId = req.user.id;
    const payload = req.body;
    const booking = await bookingService.createBooking(studentId, payload);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getMyBookings2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { status } = req.query;
    const bookings = await bookingService.getMyBookings(userId, userRole, status);
    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var getBookingById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid booking id"
      });
    }
    const booking = await bookingService.getBookingById(id, userId, userRole);
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
var markBookingComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const booking = await bookingService.markComplete(id, userId);
    res.json({
      success: true,
      message: "Booking marked as completed",
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var cancelBooking2 = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    const booking = await bookingService.cancelBooking(id, userId, userRole);
    res.json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var bookingController = {
  createBooking: createBooking2,
  getMyBookings: getMyBookings2,
  getBookingById: getBookingById2,
  markBookingComplete,
  cancelBooking: cancelBooking2
};

// src/modules/booking/booking.routes.ts
var router2 = Router2();
router2.get("/", auth_default("STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */, "ADMIN" /* ADMIN */), bookingController.getMyBookings);
router2.get("/:id", auth_default("STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */, "ADMIN" /* ADMIN */), bookingController.getBookingById);
router2.post("/", auth_default("STUDENT" /* STUDENT */), bookingController.createBooking);
router2.patch("/:id/complete", auth_default("TUTOR" /* TUTOR */), bookingController.markBookingComplete);
router2.patch("/:id/cancel", auth_default("STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */), bookingController.cancelBooking);
var bookingRouter = router2;

// src/modules/review/review.routes.ts
import { Router as Router3 } from "express";

// src/modules/review/review.service.ts
var updateTutorRating = async (tutorId) => {
  const allReviews = await prisma.review.findMany({
    where: { tutorId },
    select: { rating: true }
  });
  const totalReviews = allReviews.length;
  const avgRating = totalReviews > 0 ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;
  await prisma.tutorProfile.update({
    where: { id: tutorId },
    data: {
      rating: Number(avgRating.toFixed(1)),
      totalReviews
    }
  });
};
var createReview = async (studentId, payload) => {
  const { bookingId, rating, comment } = payload;
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      review: true
    }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.studentId !== studentId) {
    throw new Error("You can only review your own bookings");
  }
  if (booking.status !== "COMPLETED") {
    throw new Error("You can only review completed bookings");
  }
  if (booking.review) {
    throw new Error("You have already reviewed this booking");
  }
  const review = await prisma.review.create({
    data: {
      bookingId,
      tutorId: booking.tutorId,
      studentId,
      rating,
      comment
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          image: true
        }
      },
      booking: {
        select: {
          subject: true,
          date: true
        }
      }
    }
  });
  await updateTutorRating(booking.tutorId);
  return review;
};
var getTutorReviews = async (tutorId) => {
  const reviews = await prisma.review.findMany({
    where: { tutorId },
    orderBy: { createdAt: "desc" },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          image: true
        }
      },
      booking: {
        select: {
          subject: true,
          date: true
        }
      }
    }
  });
  const ratingCounts = await prisma.review.groupBy({
    by: ["rating"],
    where: { tutorId },
    _count: {
      rating: true
    }
  });
  const ratingDistribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };
  ratingCounts.forEach((item) => {
    ratingDistribution[item.rating] = item._count.rating;
  });
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;
  return {
    reviews,
    totalReviews,
    averageRating: Number(averageRating.toFixed(1)),
    ratingDistribution
  };
};
var reviewService = {
  createReview,
  getTutorReviews
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const studentId = req.user.id;
    const payload = req.body;
    if (!payload.bookingId) {
      return res.status(400).json({
        success: false,
        message: "bookingId is required"
      });
    }
    if (!payload.rating) {
      return res.status(400).json({
        success: false,
        message: "rating is required"
      });
    }
    const review = await reviewService.createReview(studentId, payload);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getTutorReviews2 = async (req, res) => {
  try {
    const { tutorId } = req.params;
    if (!tutorId || typeof tutorId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid tutor id"
      });
    }
    const reviews = await reviewService.getTutorReviews(tutorId);
    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var reviewController = {
  createReview: createReview2,
  getTutorReviews: getTutorReviews2
};

// src/modules/review/review.routes.ts
var router3 = Router3();
router3.get("/tutor/:tutorId", reviewController.getTutorReviews);
router3.post("/", auth_default("STUDENT" /* STUDENT */), reviewController.createReview);
var reviewRouter = router3;

// src/modules/availability/availability.routes.ts
import { Router as Router4 } from "express";

// src/modules/availability/availability.service.ts
var createAvailability = async (userId, payload) => {
  const { dayOfWeek, startTime, endTime } = payload;
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }
  if (dayOfWeek < 0 || dayOfWeek > 6) {
    throw new Error("Day of week must be between 0 (Sunday) and 6 (Saturday)");
  }
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
    throw new Error("Invalid time format. Use HH:MM format (e.g., 09:00)");
  }
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  if (endMinutes <= startMinutes) {
    throw new Error("End time must be after start time");
  }
  const overlappingSlot = await prisma.availability.findFirst({
    where: {
      tutorId: tutorProfile.id,
      dayOfWeek,
      isActive: true,
      OR: [
        {
          AND: [{ startTime: { lte: startTime } }, { endTime: { gt: startTime } }]
        },
        {
          AND: [{ startTime: { lt: endTime } }, { endTime: { gte: endTime } }]
        }
      ]
    }
  });
  if (overlappingSlot) {
    throw new Error("This time slot overlaps with an existing availability slot");
  }
  const availability = await prisma.availability.create({
    data: {
      tutorId: tutorProfile.id,
      dayOfWeek,
      startTime,
      endTime,
      isActive: true
    }
  });
  return availability;
};
var getMyAvailability = async (userId) => {
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }
  const availability = await prisma.availability.findMany({
    where: { tutorId: tutorProfile.id },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }]
  });
  const groupedByDay = availability.reduce((acc, slot) => {
    const day = slot.dayOfWeek;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(slot);
    return acc;
  }, {});
  return {
    slots: availability,
    groupedByDay
  };
};
var updateAvailability = async (availabilityId, userId, data) => {
  const { dayOfWeek, startTime, endTime, isActive } = data;
  const slot = await prisma.availability.findUnique({
    where: { id: availabilityId },
    include: {
      tutor: true
    }
  });
  if (!slot) {
    throw new Error("Availability slot not found");
  }
  if (slot.tutor.userId !== userId) {
    throw new Error("You do not have permission to update this availability slot");
  }
  if (dayOfWeek !== void 0 && (dayOfWeek < 0 || dayOfWeek > 6)) {
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
  const updatedSlot = await prisma.availability.update({
    where: { id: availabilityId },
    data: {
      dayOfWeek: dayOfWeek !== void 0 ? dayOfWeek : slot.dayOfWeek,
      startTime: startTime || slot.startTime,
      endTime: endTime || slot.endTime,
      isActive: isActive !== void 0 ? isActive : slot.isActive
    }
  });
  return updatedSlot;
};
var deleteAvailability = async (availabilityId, userId) => {
  const slot = await prisma.availability.findUnique({
    where: { id: availabilityId },
    include: {
      tutor: true
    }
  });
  if (!slot) {
    throw new Error("Availability slot not found");
  }
  if (slot.tutor.userId !== userId) {
    throw new Error("You do not have permission to delete this availability slot");
  }
  await prisma.availability.delete({
    where: { id: availabilityId }
  });
  return true;
};
var availabilityService = {
  createAvailability,
  getMyAvailability,
  updateAvailability,
  deleteAvailability
};

// src/modules/availability/availability.controller.ts
var createAvailability2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const payload = req.body;
    const availability = await availabilityService.createAvailability(userId, payload);
    res.status(201).json({
      success: true,
      message: "Availability slot created successfully",
      data: availability
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getMyAvailability2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const availability = await availabilityService.getMyAvailability(userId);
    res.json({
      success: true,
      data: availability
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
var updateAvailability2 = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const data = req.body;
    const availability = await availabilityService.updateAvailability(id, userId, data);
    res.json({
      success: true,
      message: "Availability slot updated successfully",
      data: availability
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var deleteAvailability2 = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await availabilityService.deleteAvailability(id, userId);
    res.json({
      success: true,
      message: "Availability slot deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var availabilityController = {
  createAvailability: createAvailability2,
  getMyAvailability: getMyAvailability2,
  updateAvailability: updateAvailability2,
  deleteAvailability: deleteAvailability2
};

// src/modules/availability/availability.routes.ts
var router4 = Router4();
router4.get("/", auth_default("TUTOR" /* TUTOR */), availabilityController.getMyAvailability);
router4.post("/", auth_default("TUTOR" /* TUTOR */), availabilityController.createAvailability);
router4.put("/:id", auth_default("TUTOR" /* TUTOR */), availabilityController.updateAvailability);
router4.delete("/:id", auth_default("TUTOR" /* TUTOR */), availabilityController.deleteAvailability);
var availabilityRouter = router4;

// src/modules/category/category.routes.ts
import { Router as Router5 } from "express";

// src/modules/category/category.service.ts
var getAllCategories = async () => {
  return await prisma.category.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      name: "asc"
    }
  });
};
var categoryService = {
  getAllCategories
};

// src/modules/category/category.controller.ts
var getAllCategories2 = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch categories"
    });
  }
};
var categoryController = {
  getAllCategories: getAllCategories2
};

// src/modules/category/category.routes.ts
var router5 = Router5();
router5.get("/", categoryController.getAllCategories);
var categoryRouter = router5;

// src/modules/admin/admin.routes.ts
import { Router as Router6 } from "express";

// src/modules/admin/admin.service.ts
var getStats2 = async () => {
  const totalUsers = await prisma.user.count();
  const totalStudents = await prisma.user.count({ where: { role: "STUDENT" } });
  const totalTutors = await prisma.user.count({ where: { role: "TUTOR" } });
  const totalAdmins = await prisma.user.count({ where: { role: "ADMIN" } });
  const totalBookings = await prisma.booking.count();
  const confirmedBookings = await prisma.booking.count({
    where: { status: "CONFIRMED" }
  });
  const completedBookings = await prisma.booking.count({
    where: { status: "COMPLETED" }
  });
  const cancelledBookings = await prisma.booking.count({
    where: { status: "CANCELLED" }
  });
  const completedBookingsData = await prisma.booking.findMany({
    where: { status: "COMPLETED" },
    select: { price: true }
  });
  const totalRevenue = completedBookingsData.reduce(
    (sum, booking) => sum + booking.price,
    0
  );
  const totalReviews = await prisma.review.count();
  return {
    overview: {
      totalUsers,
      totalStudents,
      totalTutors,
      totalAdmins,
      totalBookings,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalReviews
    },
    bookings: {
      total: totalBookings,
      confirmed: confirmedBookings,
      completed: completedBookings,
      cancelled: cancelledBookings
    }
  };
};
var getAllUsers = async (filters) => {
  const where = {};
  if (filters.role) {
    where.role = filters.role;
  }
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } }
    ];
  }
  return await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      emailVerified: true,
      banned: true,
      banReason: true,
      banExpires: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getAllBookings = async (status) => {
  const where = {};
  if (status) {
    where.status = status;
  }
  return await prisma.booking.findMany({
    where,
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      tutor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      },
      review: true
    },
    orderBy: {
      date: "desc"
    }
  });
};
var getAllCategories3 = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc"
    }
  });
};
var createCategory = async (data) => {
  const { name, slug, description, icon } = data;
  const existingCategory = await prisma.category.findFirst({
    where: {
      OR: [{ name }, { slug }]
    }
  });
  if (existingCategory) {
    throw new Error("Category with this name or slug already exists");
  }
  return await prisma.category.create({
    data: {
      name,
      slug,
      description: description || null,
      icon: icon || null,
      isActive: true
    }
  });
};
var updateCategory = async (id, data) => {
  const { name, slug, description, icon, isActive } = data;
  const category = await prisma.category.findUnique({
    where: { id }
  });
  if (!category) {
    throw new Error("Category not found");
  }
  if (name || slug) {
    const duplicate = await prisma.category.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          {
            OR: [
              ...name ? [{ name }] : [],
              ...slug ? [{ slug }] : []
            ]
          }
        ]
      }
    });
    if (duplicate) {
      throw new Error("Category with this name or slug already exists");
    }
  }
  return await prisma.category.update({
    where: { id },
    data: {
      ...name && { name },
      ...slug && { slug },
      ...description !== void 0 && { description },
      ...icon !== void 0 && { icon },
      ...isActive !== void 0 && { isActive }
    }
  });
};
var banUser = async (userId, data) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.role === "ADMIN") {
    throw new Error("Cannot ban an admin user");
  }
  if (user.banned) {
    throw new Error("User is already banned");
  }
  const banExpiresDate = data.banExpires ? new Date(data.banExpires) : null;
  return await prisma.user.update({
    where: { id: userId },
    data: {
      banned: true,
      banReason: data.reason || "Violated platform terms",
      banExpires: banExpiresDate
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      banned: true,
      banReason: true,
      banExpires: true
    }
  });
};
var unbanUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.banned) {
    throw new Error("User is not banned");
  }
  return await prisma.user.update({
    where: { id: userId },
    data: {
      banned: false,
      banReason: null,
      banExpires: null
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      banned: true,
      banReason: true,
      banExpires: true
    }
  });
};
var adminService = {
  getStats: getStats2,
  getAllUsers,
  getAllBookings,
  getAllCategories: getAllCategories3,
  createCategory,
  updateCategory,
  banUser,
  unbanUser
};

// src/modules/admin/admin.controller.ts
var getStats3 = async (req, res) => {
  try {
    const stats = await adminService.getStats();
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch statistics"
    });
  }
};
var getAllUsers2 = async (req, res) => {
  try {
    const { role, search } = req.query;
    const users = await adminService.getAllUsers({
      role,
      search
    });
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users"
    });
  }
};
var getAllBookings2 = async (req, res) => {
  try {
    const { status } = req.query;
    const bookings = await adminService.getAllBookings(status);
    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch bookings"
    });
  }
};
var getAllCategories4 = async (req, res) => {
  try {
    const categories = await adminService.getAllCategories();
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch categories"
    });
  }
};
var createCategory2 = async (req, res) => {
  try {
    const { name, slug, description, icon } = req.body;
    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Name and slug are required"
      });
    }
    const category = await adminService.createCategory({
      name,
      slug,
      description,
      icon
    });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create category"
    });
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, icon, isActive } = req.body;
    const category = await adminService.updateCategory(id, {
      name,
      slug,
      description,
      icon,
      isActive
    });
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update category"
    });
  }
};
var banUser2 = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, banExpires } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }
    const user = await adminService.banUser(id, { reason, banExpires });
    res.status(200).json({
      success: true,
      message: "User banned successfully",
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to ban user"
    });
  }
};
var unbanUser2 = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }
    const user = await adminService.unbanUser(id);
    res.status(200).json({
      success: true,
      message: "User unbanned successfully",
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to unban user"
    });
  }
};
var adminController = {
  getStats: getStats3,
  getAllUsers: getAllUsers2,
  getAllBookings: getAllBookings2,
  getAllCategories: getAllCategories4,
  createCategory: createCategory2,
  updateCategory: updateCategory2,
  banUser: banUser2,
  unbanUser: unbanUser2
};

// src/modules/admin/admin.routes.ts
var router6 = Router6();
router6.use(auth_default("ADMIN" /* ADMIN */));
router6.get("/stats", adminController.getStats);
router6.get("/users", adminController.getAllUsers);
router6.patch("/users/:id/ban", adminController.banUser);
router6.patch("/users/:id/unban", adminController.unbanUser);
router6.get("/bookings", adminController.getAllBookings);
router6.get("/categories", adminController.getAllCategories);
router6.post("/categories", adminController.createCategory);
router6.put("/categories/:id", adminController.updateCategory);
var adminRouter = router6;

// src/app.ts
var app = express();
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/tutors", tutorRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("edu-bridge server is running");
});
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
