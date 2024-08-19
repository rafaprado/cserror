/*
  Warnings:

  - Added the required column `gymId` to the `Check_Ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Check_Ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Check_Ins" ADD COLUMN     "gymId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Check_Ins" ADD CONSTRAINT "Check_Ins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Check_Ins" ADD CONSTRAINT "Check_Ins_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
