-- CreateTable
CREATE TABLE "Hero" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "fullName" STRING NOT NULL,
    "profession" STRING NOT NULL,
    "description" STRING NOT NULL,
    "email" STRING NOT NULL,
    "location" STRING NOT NULL,
    "isOpenToWork" BOOL NOT NULL,
    "github" STRING,
    "linkedin" STRING,
    "telegram" STRING,
    "image" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechStack" (
    "id" STRING NOT NULL,
    "icon" STRING NOT NULL,
    "name" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechStack_pkey" PRIMARY KEY ("id")
);
