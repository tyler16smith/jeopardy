/*
  Warnings:

  - You are about to drop the `PlayerScore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerScore" DROP CONSTRAINT "PlayerScore_playerId_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "PlayerScore";
