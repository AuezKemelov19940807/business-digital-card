import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDigitalCardInput } from './dto/create-digital-card.input.js';
import { prisma } from '../lib/prisma.js';
import { UpdateDigitalCardInput } from './dto/update-digital-card.input.js';

@Injectable()
export class DigitalCardService {
  async create(input: CreateDigitalCardInput) {
    return prisma.digitalCard.create({
      data: input,
    });
  }

  async get(id: string) {
    const card = await prisma.digitalCard.findUnique({
      where: {
        id,
      },
    });

    if (!card) {
      throw new NotFoundException('Digital card not found');
    }

    return card;
  }

  async update(input: UpdateDigitalCardInput) {
    const { id, ...data } = input;

    const card = await prisma.digitalCard.findUnique({
      where: {
        id,
      },
    });

    if (!card) {
      throw new NotFoundException('Digital card not found');
    }

    return prisma.digitalCard.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const card = await prisma.digitalCard.findUnique({
      where: {
        id,
      },
    });

    if (!card) {
      throw new NotFoundException('Digital card not found');
    }

    return prisma.digitalCard.delete({
      where: {
        id,
      },
    });
  }
}
