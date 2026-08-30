import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../lib/prisma.js';
import { CreateExperienceInputDto } from './dto/create-experience.input.js';
import { UpdateExperienceInputDto } from './dto/update-experience.input.js';

@Injectable()
export class ExperienceService {
  async getAll() {
    return prisma.experience.findMany();
  }

  async create(input: CreateExperienceInputDto) {
    return prisma.experience.create({
      data: input,
    });
  }

  async get(id: string) {
    const experienceItem = await prisma.experience.findUnique({
      where: {
        id,
      },
    });

    if (!experienceItem) {
      throw new NotFoundException('Experience not found');
    }

    return experienceItem;
  }

  async update(input: UpdateExperienceInputDto) {
    const { id, ...data } = input;

    const experienceItem = await prisma.experience.findUnique({
      where: {
        id,
      },
    });

    if (!experienceItem) {
      throw new NotFoundException('Experience not found');
    }

    return prisma.experience.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const experienceItem = await prisma.experience.findUnique({
      where: {
        id,
      },
    });

    if (!experienceItem) {
      throw new NotFoundException('Experience not found');
    }

    return prisma.experience.delete({
      where: {
        id,
      },
    });
  }
}
