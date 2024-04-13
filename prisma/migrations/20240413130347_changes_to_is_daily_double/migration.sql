/*
  Warnings:

  - You are about to drop the column `doubleJeopardyAnswer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `doubleJeopardyQuestion` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "doubleJeopardyAnswer",
DROP COLUMN "doubleJeopardyQuestion",
ADD COLUMN     "isDailyDouble" BOOLEAN NOT NULL DEFAULT false;
