/*
  Warnings:

  - You are about to drop the column `dislikes` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_songId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "dislikes",
DROP COLUMN "likes";

-- DropTable
DROP TABLE "Vote";

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "songId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "dislike" (
    "id" TEXT NOT NULL,
    "songId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_id_key" ON "Like"("id");

-- CreateIndex
CREATE UNIQUE INDEX "dislike_id_key" ON "dislike"("id");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dislike" ADD CONSTRAINT "dislike_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
