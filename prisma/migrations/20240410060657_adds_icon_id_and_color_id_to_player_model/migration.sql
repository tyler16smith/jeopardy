/*
  Warnings:

  - Added the required column `colorId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "colorId" TEXT NOT NULL,
ADD COLUMN     "iconId" TEXT NOT NULL;
