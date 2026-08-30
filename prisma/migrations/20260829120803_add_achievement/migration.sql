-- CreateTable
CREATE TABLE "Achievement" (
    "id" STRING NOT NULL,
    "number" STRING NOT NULL,
    "title" STRING NOT NULL,
    "icon" STRING,
    "description" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);
