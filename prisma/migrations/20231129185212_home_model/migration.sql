-- CreateTable
CREATE TABLE "Home" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);
