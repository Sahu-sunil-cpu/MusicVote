-- AlterTable
ALTER TABLE "User" ALTER COLUMN "forgotPasswordToken" SET DEFAULT '',
ALTER COLUMN "forgotPasswordTokenExpiry" DROP NOT NULL,
ALTER COLUMN "isVerified" SET DEFAULT false,
ALTER COLUMN "verifyToken" SET DEFAULT '',
ALTER COLUMN "verifyTokenExpiry" DROP NOT NULL;
