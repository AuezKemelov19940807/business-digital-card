import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ExperienceService } from './experience.service.js';
import { ExperienceType } from './types/experience.type.js';
import { CreateExperienceInputDto } from './dto/create-experience.input.js';
import { UpdateExperienceInputDto } from './dto/update-experience.input.js';

@Resolver()
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Mutation(() => ExperienceType)
  createExperience(@Args('input') input: CreateExperienceInputDto) {
    return this.experienceService.create(input);
  }

  @Query(() => [ExperienceType])
  experiences() {
    return this.experienceService.getAll();
  }

  @Query(() => ExperienceType)
  getExperience(@Args('id') id: string) {
    return this.experienceService.get(id);
  }

  @Mutation(() => ExperienceType)
  updateExperience(@Args('input') input: UpdateExperienceInputDto) {
    return this.experienceService.update(input);
  }

  @Mutation(() => ExperienceType)
  removeExperience(@Args('id') id: string) {
    return this.experienceService.remove(id);
  }
}
