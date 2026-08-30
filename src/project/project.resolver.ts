import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProjectType } from './types/project.type.js';
import { ProjectService } from './project.service.js';
import { CreateProjectInputDto } from './dto/create-project.input.js';
import { UpdateProjectInputDto } from './dto/update-project.input.js';
import { TechStackType } from '../tech-stack/types/tech-stack.type.js';

@Resolver(() => ProjectType)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [ProjectType])
  projects() {
    return this.projectService.getAll();
  }

  @Query(() => ProjectType)
  getProject(@Args('id') id: string) {
    return this.projectService.get(id);
  }

  @Mutation(() => ProjectType)
  createProject(@Args('input') input: CreateProjectInputDto) {
    return this.projectService.create(input);
  }

  @Mutation(() => ProjectType)
  updateProject(@Args('input') input: UpdateProjectInputDto) {
    return this.projectService.update(input);
  }

  @Mutation(() => ProjectType)
  removeProject(@Args('id') id: string) {
    return this.projectService.remove(id);
  }

  @ResolveField(() => [TechStackType])
  techStacks(project: ProjectType) {
    return this.projectService.getTechStacks(project.id);
  }

  @ResolveField(() => String)
  image(@Parent() project: ProjectType) {
    return `${process.env.API_URL}/api/files/${project.image}`;
  }
}
