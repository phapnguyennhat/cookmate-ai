import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/database/entity/recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipe } from './dto/createRecipe.dto';
import { QueryRecipeDto } from './dto/QueryRecipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectRepository(Recipe) private readonly recipeRepo: Repository<Recipe>){}

  async create(createRecipe: CreateRecipe){
    return this.recipeRepo.save(createRecipe)
  }

  async findByName (recipeName :string){
    return this.recipeRepo.findOneBy({recipeName})
  }

  async findRecipe  (queryRecipeDto :QueryRecipeDto){
    const {page=1, limit=10, categoryName} = queryRecipeDto

    const queryBuilder = this.recipeRepo
      .createQueryBuilder('recipe')
      .select(['recipe.id', 'recipe.recipeName', 'recipe.recipeImageUrl'])
      .skip((page - 1) * limit)
      .take(limit);


    if(categoryName){
      queryBuilder.innerJoin('recipe.categories', 'categories')
      .andWhere('categories.name =:categoryName', {categoryName})

    }
    const [recipes, count] = await queryBuilder.getManyAndCount()
    return {recipes, count}
  }
}
