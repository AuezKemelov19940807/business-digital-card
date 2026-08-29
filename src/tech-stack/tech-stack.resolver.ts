import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TechStackType } from './types/tech-stack.type.js';
import { TechStackService } from './tech-stack.service.js';
import { CreateTechStackInput } from './dto/create-tech-stack.input.js';
import { UpdateTechStackInput } from './dto/update-tech-stack.input.js';

@Resolver(() => TechStackType)
export class TechStackResolver {
  constructor(private readonly techStackService: TechStackService) {}

  @Mutation(() => TechStackType)
  createTechStack(@Args('input') input: CreateTechStackInput) {
    return this.techStackService.create(input);
  }

  @Query(() => [TechStackType])
  techStack() {
    return this.techStackService.findAll();
  }

  @Mutation(() => TechStackType)
  updateTechStack(@Args('input') input: UpdateTechStackInput) {
    return this.techStackService.update(input);
  }

  @Mutation(() => TechStackType)
  removeTechStack(@Args('id') id: string) {
    return this.techStackService.remove(id);
  }
}
