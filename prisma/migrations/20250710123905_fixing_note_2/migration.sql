/*
  Warnings:

  - Added the required column `enhanced_text` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "enhanced_text" TEXT NOT NULL;
