-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "googleID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_googleID_key" ON "User"("googleID");
