import { Module } from '@nestjs/common';
import { HeroService } from './hero.service.js';
import { HeroResolver } from './hero.resolver.js';

@Module({
  providers: [HeroService, HeroResolver],
})
export class HeroModule {}
