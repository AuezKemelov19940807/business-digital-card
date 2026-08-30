-- CreateTable
CREATE TABLE "Project" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "image" STRING,
    "url" STRING,
    "github" STRING,
    "isFeatured" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
