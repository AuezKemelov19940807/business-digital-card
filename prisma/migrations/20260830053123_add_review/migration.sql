-- CreateTable
CREATE TABLE "Review" (
    "id" STRING NOT NULL,
    "description" STRING NOT NULL,
    "avatar" STRING,
    "full_name" STRING NOT NULL,
    "position" STRING,
    "rating" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
