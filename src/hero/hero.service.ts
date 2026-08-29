import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../lib/prisma.js';
import { UpdateHeroDtoInput } from './dto/update-hero-dto.input.js';

@Injectable()
export class HeroService {
  async get() {
    const hero = await prisma.hero.findUnique({
      where: {
        id: 'main',
      },
    });

    if (!hero) {
      throw new NotFoundException('Hero not found');
    }

    return hero;
  }

  async update(input: UpdateHeroDtoInput) {
    return prisma.hero.update({
      where: {
        id: 'main',
      },
      data: input,
    });
  }
}
