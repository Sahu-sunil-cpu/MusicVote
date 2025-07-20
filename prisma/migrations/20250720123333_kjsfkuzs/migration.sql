-- AlterTable
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Dislike_id_key";

-- AlterTable
ALTER TABLE "Like" ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Like_id_key";
