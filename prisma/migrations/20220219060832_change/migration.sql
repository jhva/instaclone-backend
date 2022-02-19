/*
  Warnings:

  - You are about to drop the column `cation` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "cation",
DROP COLUMN "createAt",
ADD COLUMN     "caption" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
