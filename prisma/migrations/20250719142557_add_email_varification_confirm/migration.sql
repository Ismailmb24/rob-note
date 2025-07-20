-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verificationExpire" TIMESTAMP(3),
ADD COLUMN     "verificationToken" TEXT;
