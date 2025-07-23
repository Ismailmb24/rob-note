/*
  Warnings:

  - You are about to drop the column `verificationExpire` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "verificationExpire",
DROP COLUMN "verificationToken",
ADD COLUMN     "reset_password_expire" TIMESTAMP(3),
ADD COLUMN     "reset_password_token" TEXT,
ADD COLUMN     "verification_expire" TIMESTAMP(3),
ADD COLUMN     "verification_token" TEXT;
