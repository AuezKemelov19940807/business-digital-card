import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../lib/prisma.js';
import { NotFoundError } from 'rxjs';
import { error } from 'console';
import { CreateProjectInputDto } from './dto/create-project.input.js';
import { UpdateProjectInputDto } from './dto/update-project.input.js';

@Injectable()
export class ProjectService {
  async getAll() {
    return prisma.project.findMany({
      include: {
        projectTechStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });
  }

  async get(id: string) {
    const projectItem = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!projectItem) {
      throw new NotFoundException('Not Found Project');
    }

    return projectItem;
  }

  async create(input: CreateProjectInputDto) {
    const { techStackIds, ...projectData } = input;

    return prisma.project.create({
      data: {
        ...projectData,

        projectTechStacks: {
          create: techStackIds?.map((techStackId) => ({
            techStack: {
              connect: {
                id: techStackId,
              },
            },
          })),
        },
      },

      include: {
        projectTechStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });
  }

  async update(input: UpdateProjectInputDto) {
    const { id, techStackIds, ...projectData } = input;

    const projectItem = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!projectItem) {
      throw new NotFoundException('Not Found Project');
    }

    return prisma.project.update({
      where: {
        id,
      },
      data: {
        ...projectData,

        projectTechStacks: {
          deleteMany: {},
          create: techStackIds?.map((techStackId) => ({
            techStack: {
              connect: {
                id: techStackId,
              },
            },
          })),
        },
      },

      include: {
        projectTechStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const projectItem = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!projectItem) {
      throw new NotFoundException('Project not found');
    }

    return prisma.$transaction(async (tx) => {
      await tx.projectTechStack.deleteMany({
        where: {
          projectId: id,
        },
      });

      return tx.project.delete({
        where: {
          id,
        },
      });
    });
  }

  async getTechStacks(projectId: string) {
    const projectTechStacks = await prisma.projectTechStack.findMany({
      where: {
        projectId,
      },
      include: {
        techStack: true,
      },
    });

    return projectTechStacks.map(
      (projectTechStack) => projectTechStack.techStack,
    );
  }
}
