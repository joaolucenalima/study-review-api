-- AlterTable
ALTER TABLE "Revisions" ALTER COLUMN "day" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "first_date" SET DATA TYPE TEXT,
ALTER COLUMN "next_revision_day" SET DATA TYPE TEXT;
