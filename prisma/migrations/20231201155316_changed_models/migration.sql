/*
  Warnings:

  - Added the required column `descriptionSubtitle` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modalImage` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "About" ADD COLUMN     "descriptionSubtitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "subtitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "modalImage" TEXT NOT NULL;
