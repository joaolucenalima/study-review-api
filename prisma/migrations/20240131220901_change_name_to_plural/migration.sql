/*
  Warnings:

  - You are about to drop the `Revision` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Revision" DROP CONSTRAINT "Revision_task_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_user_id_fkey";

-- DropTable
DROP TABLE "Revision";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "first_date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "next_revision_day" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revisions" (
    "id" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "revised" BOOLEAN NOT NULL,
    "task_id" TEXT,

    CONSTRAINT "Revisions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revisions" ADD CONSTRAINT "Revisions_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
