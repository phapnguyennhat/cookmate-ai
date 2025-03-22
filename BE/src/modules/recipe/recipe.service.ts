import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/database/entity/recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipe } from './dto/createRecipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectRepository(Recipe) private readonly recipeRepo: Repository<Recipe>){}

  async create(createRecipe: CreateRecipe){
    return this.recipeRepo.save(createRecipe)
  }

  async findByName (recipeName :string){
    return this.recipeRepo.findOneBy({recipeName})
  }
}
