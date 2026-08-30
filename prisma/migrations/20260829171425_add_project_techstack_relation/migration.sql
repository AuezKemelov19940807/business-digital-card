-- CreateTable
CREATE TABLE "ProjectTechStack" (
    "projectId" STRING NOT NULL,
    "techStackId" STRING NOT NULL,
    CONSTRAINT "ProjectTechStack_pkey"
        PRIMARY KEY ("projectId", "techStackId")
) WITH (schema_locked = false);

-- Unlock Project
ALTER TABLE "Project" SET (schema_locked = false);

-- Unlock TechStack
ALTER TABLE "TechStack" SET (schema_locked = false);

-- AddForeignKey
ALTER TABLE "ProjectTechStack"
ADD CONSTRAINT "ProjectTechStack_projectId_fkey"
FOREIGN KEY ("projectId")
REFERENCES "Project"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechStack"
ADD CONSTRAINT "ProjectTechStack_techStackId_fkey"
FOREIGN KEY ("techStackId")
REFERENCES "TechStack"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;