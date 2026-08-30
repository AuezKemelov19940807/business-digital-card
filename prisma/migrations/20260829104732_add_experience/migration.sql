-- CreateTable
CREATE TABLE "Experience" (
    "id" STRING NOT NULL,
    "company" STRING NOT NULL,
    "position" STRING NOT NULL,
    "description" STRING,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isCurrent" BOOL NOT NULL DEFAULT false,
    "location" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);
