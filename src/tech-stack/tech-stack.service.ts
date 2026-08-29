import { Injectable } from '@nestjs/common';
import { CreateTechStackInput } from './dto/create-tech-stack.input.js';
import { prisma } from '../lib/prisma.js';
import { UpdateTechStackInput } from './dto/update-tech-stack.input.js';
import { S3Service } from '../s3/s3.service.js';

@Injectable()
export class TechStackService {
  constructor(private readonly s3Service: S3Service) {}

  async create(input: CreateTechStackInput) {
    return prisma.techStack.create({
      data: input,
    });
  }

  async findAll() {
    return prisma.techStack.findMany();
  }

  async get(id: string) {
    const techStackItem = await prisma.techStack.findUnique({
      where: {
        id,
      },
    });

    if (!techStackItem) {
      throw new Error('Tech Stack not found');
    }

    return techStackItem;
  }

  async update(input: UpdateTechStackInput) {
    const { id, ...data } = input;

    const techStackItem = await prisma.techStack.findUnique({
      where: {
        id,
      },
    });

    if (!techStackItem) {
      throw new Error('Tech Stack not found');
    }

    return prisma.techStack.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const techStackItem = await prisma.techStack.findUnique({
      where: {
        id,
      },
    });

    if (!techStackItem) {
      throw new Error('Tech Stack not found');
    }

    return prisma.techStack.delete({
      where: {
        id,
      },
    });
  }
}
