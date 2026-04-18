/*
  Warnings:

  - A unique constraint covering the columns `[paymentIntentId]` on the table `booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PAID', 'REFUNDED');

-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "paymentIntentId" TEXT,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID';

-- CreateIndex
CREATE UNIQUE INDEX "booking_paymentIntentId_key" ON "booking"("paymentIntentId");
