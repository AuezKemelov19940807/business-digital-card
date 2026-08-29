import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Hero } from './types/hero.type.js';
import { HeroService } from './hero.service.js';
import { UpdateHeroDtoInput } from './dto/update-hero-dto.input.js';

@Resolver(() => Hero)
export class HeroResolver {
  constructor(private readonly heroService: HeroService) {}

  @Query(() => Hero)
  async hero() {
    return this.heroService.get();
  }

  @Mutation(() => Hero)
  async updateHero(@Args('input') input: UpdateHeroDtoInput) {
    return this.heroService.update(input);
  }
}
