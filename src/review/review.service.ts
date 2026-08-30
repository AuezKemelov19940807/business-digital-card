import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../lib/prisma.js';
import { CreateReviewDto } from './dto/create-review.input.js';
import { UpdateReviewInputDto } from './dto/update-review.input.js';

@Injectable()
export class ReviewService {
  async getAll() {
    return prisma.review.findMany();
  }

  async get(id: string) {
    const reviewItem = await prisma.review.findUnique({
      where: {
        id,
      },
    });

    if (!reviewItem) {
      throw new NotFoundException('Not found Review');
    }

    return reviewItem;
  }

  async create(input: CreateReviewDto) {
    return prisma.review.create({
      data: input,
    });
  }

  async update(input: UpdateReviewInputDto) {
    const { id, ...data } = input;

    const reviewItem = await prisma.review.findUnique({
      where: {
        id,
      },
    });

    if (!reviewItem) {
      throw new NotFoundException('Not found Review');
    }

    return prisma.review.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const reviewItem = await prisma.review.findUnique({
      where: {
        id,
      },
    });

    if (!reviewItem) {
      throw new NotFoundException('Not found Review');
    }

    return prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
