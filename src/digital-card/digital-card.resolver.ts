import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DigitalCard } from './types/digital-card.type.js';
import { DigitalCardService } from './digital-card.service.js';
import { CreateDigitalCardInput } from './dto/create-digital-card.input.js';
import { UpdateDigitalCardInput } from './dto/update-digital-card.input.js';

@Resolver(() => DigitalCard)
export class DigitalCardResolver {
  constructor(private readonly digitalCardService: DigitalCardService) {}

  @Mutation(() => DigitalCard)
  createDigitalCard(@Args('input') input: CreateDigitalCardInput) {
    return this.digitalCardService.create(input);
  }

  @Query(() => DigitalCard)
  getDigitalCard(@Args('id') id: string) {
    return this.digitalCardService.get(id);
  }

  @Mutation(() => DigitalCard)
  updateDigitalCard(@Args('input') input: UpdateDigitalCardInput) {
    return this.digitalCardService.update(input);
  }

  @Mutation(() => DigitalCard)
  deleteDigitalCard(@Args('id') id: string) {
    return this.digitalCardService.remove(id);
  }
}
