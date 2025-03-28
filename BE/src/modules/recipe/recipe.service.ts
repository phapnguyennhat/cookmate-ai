import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/database/entity/recipe.entity';
import { Repository } from 'typeorm';
import { QueryRecipeDto } from './dto/QueryRecipe.dto';
import { ECollection, EOrder } from 'src/common/enum';
import { UserFavorite } from 'src/database/entity/user-favorite.entity';
import { UserRecipe } from './dto/RecipeId.Dto';
import { CreateRecipe } from './dto/CreateRecipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private readonly recipeRepo: Repository<Recipe>,
    @InjectRepository(UserFavorite)
    private readonly userFavoriteRepo: Repository<UserFavorite>,
  ) {}

  async create(createRecipe: CreateRecipe) {
    return this.recipeRepo.save(createRecipe);
  }

  async saveFavorite(userRecipe: UserRecipe) {
    return this.userFavoriteRepo.save(userRecipe);
  }

  async deleteFavorite (userRecipe: UserRecipe){
    return this.userFavoriteRepo.delete(userRecipe)
  }

  async findByName(recipeName: string) {
    return this.recipeRepo.findOneBy({ recipeName });
  }

  async findRecipe(queryRecipeDto: QueryRecipeDto, userId?: string) {
    const {
      page = 1,
      limit = 10,
      categoryName,
      createAt,
      collection,
    } = queryRecipeDto;

    const queryBuilder = this.recipeRepo
      .createQueryBuilder('recipe')
      .select([
        'recipe.id',
        'recipe.recipeName',
        'recipe.recipeImageUrl',
        'recipe.createAt',
      ])
      .skip((page - 1) * limit)
      .take(limit);

    if (categoryName) {
      queryBuilder
        .innerJoin('recipe.categories', 'categories')
        .andWhere('categories.name =:categoryName', { categoryName });
    }
    if (createAt) {
      queryBuilder.orderBy(
        'recipe.createAt',
        createAt.toString().toUpperCase() as any,
      );
    }
    if (collection) {
      if (collection === ECollection.MYRECIPE) {
        queryBuilder.andWhere('recipe.userId=:userId', { userId });
      }else if(collection === ECollection.MYFAVORITE){
        queryBuilder.innerJoin('recipe.userFavorites', 'userFavorites', 'userFavorites.userId=:userId', {userId})
      }
    }

    


    const [recipes, count] = await queryBuilder.getManyAndCount();
    return { recipes, count, page };
  }

  async findById(id: string, userId?: string) {
    const queryBuilder = this.recipeRepo
      .createQueryBuilder('recipe')
      .innerJoin('recipe.ingredients', 'ingredients')
      .leftJoin(
        'recipe.userFavorites',
        'userFavorites',
        'userFavorites.userId=:userId',
        { userId },
      )

      .select([
        'recipe.id',
        'recipe.recipeName',
        'recipe.description',
        'ingredients',
        'recipe.steps',
        'recipe.userId',
        'recipe.calories',
        'recipe.cookTime',
        'recipe.serveTo',
        'recipe.recipeImageUrl',
        'userFavorites'
      ])
      .andWhere('recipe.id =:id', { id });

    return queryBuilder.getOne();
  }
  
  async findRecipeByIdAndUserId(id: string, userId: string) {
    return this.recipeRepo.findOneBy({id, userId})
  }

  async delete(id: string) {
    return this.recipeRepo.delete(id)
  }
}
