import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/database/entity/recipe.entity';
import { GuruaiModule } from '../guruai/guruai.module';
import { OpenaiModule } from '../openai/openai.module';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { UserFavorite } from 'src/database/entity/user-favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, UserFavorite]), GuruaiModule, OpenaiModule, CategoryModule, UserModule],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
