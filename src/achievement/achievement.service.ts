import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../lib/prisma.js';
import { CreateAchievementInputDto } from './dto/create-achievement.input.js';
import { UpdateAchievementInputDto } from './dto/update-achievement.input.js';

@Injectable()
export class AchievementService {
  async getAll() {
    return prisma.achievement.findMany();
  }

  async create(input: CreateAchievementInputDto) {
    return prisma.achievement.create({
      data: input,
    });
  }

  async get(id: string) {
    const achievementItem = await prisma.achievement.findUnique({
      where: {
        id,
      },
    });

    if (!achievementItem) {
      throw new NotFoundException('Achievement not found');
    }

    return achievementItem;
  }

  async update(input: UpdateAchievementInputDto) {
    const { id, ...data } = input;
    const achievementItem = await prisma.achievement.findUnique({
      where: {
        id,
      },
    });

    if (!achievementItem) {
      throw new NotFoundException('Achievement not found');
    }

    return prisma.achievement.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const achievementItem = await prisma.achievement.findUnique({
      where: {
        id,
      },
    });

    if (!achievementItem) {
      throw new NotFoundException('Achievement not found');
    }

    return prisma.achievement.delete({
      where: {
        id,
      },
    });
  }
}
