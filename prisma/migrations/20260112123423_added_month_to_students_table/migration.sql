/*
  Warnings:

  - Added the required column `month` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "month" TEXT NOT NULL;
