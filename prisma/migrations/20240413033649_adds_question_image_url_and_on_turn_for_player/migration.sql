-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "onTurn" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "imageURL" TEXT;
