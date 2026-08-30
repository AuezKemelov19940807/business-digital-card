import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AchievementType } from './types/achievement.type.js';
import { CreateAchievementInputDto } from './dto/create-achievement.input.js';
import { AchievementService } from './achievement.service.js';
import { UpdateAchievementInputDto } from './dto/update-achievement.input.js';

@Resolver(() => AchievementType)
export class AchievementResolver {
  constructor(private readonly achievementService: AchievementService) {}

  @Mutation(() => AchievementType)
  createAchievement(@Args('input') input: CreateAchievementInputDto) {
    return this.achievementService.create(input);
  }

  @Query(() => [AchievementType])
  achievements() {
    return this.achievementService.getAll();
  }

  @Query(() => AchievementType)
  getAchievement(@Args('id') id: string) {
    return this.achievementService.get(id);
  }

  @Mutation(() => AchievementType)
  updateAchievement(@Args('input') input: UpdateAchievementInputDto) {
    return this.achievementService.update(input);
  }

  @Mutation(() => AchievementType)
  removeAchievement(@Args('id') id: string) {
    return this.achievementService.remove(id);
  }

    @ResolveField(() => String)
    icon(@Parent() achievement: AchievementType) {
      return `${process.env.API_URL}/api/files/${achievement.icon}`;
    }
}
