import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/database/entity/recipe.entity';
import { GuruaiModule } from '../guruai/guruai.module';
import { OpenaiModule } from '../openai/openai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), GuruaiModule, OpenaiModule],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
