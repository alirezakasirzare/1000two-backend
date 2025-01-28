/*
  Warnings:

  - You are about to drop the column `createdAt` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `chapterId` on the `step` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `step` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `step` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapter_id` to the `step` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `step` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "step" DROP CONSTRAINT "step_chapterId_fkey";

-- AlterTable
ALTER TABLE "chapter" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "step" DROP COLUMN "chapterId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "chapter_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "step" ADD CONSTRAINT "step_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
