/*
  Warnings:

  - Changed the type of `colorId` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `iconId` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "colorId",
ADD COLUMN     "colorId" INTEGER NOT NULL,
DROP COLUMN "iconId",
ADD COLUMN     "iconId" INTEGER NOT NULL;
