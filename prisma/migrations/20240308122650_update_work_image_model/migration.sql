/*
  Warnings:

  - You are about to drop the column `alt` on the `work_images` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `work_images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "work_images" DROP COLUMN "alt",
DROP COLUMN "title";
