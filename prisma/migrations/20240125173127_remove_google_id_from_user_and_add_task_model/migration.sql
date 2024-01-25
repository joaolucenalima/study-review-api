/*
  Warnings:

  - You are about to drop the column `googleID` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_googleID_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleID";

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
