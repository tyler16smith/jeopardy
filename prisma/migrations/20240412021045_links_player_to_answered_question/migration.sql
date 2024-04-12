-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "questionId" TEXT;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "answeredBy" TEXT;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
