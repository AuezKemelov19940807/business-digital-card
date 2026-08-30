import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AppResolver } from './app.resolver.js';

import { HeroModule } from './hero/hero.module.js';
import { TechStackModule } from './tech-stack/tech-stack.module.js';
import { FilesModule } from './files/files.module.js';
import { ExperienceModule } from './experience/experience.module.js';
import { AchievementModule } from './achievement/achievement.module.js';
import { ProjectModule } from './project/project.module.js';
import { ReviewModule } from './review/review.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      graphiql: true,
    }),
    HeroModule,
    TechStackModule,
    FilesModule,
    ExperienceModule,
    AchievementModule,
    ProjectModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
