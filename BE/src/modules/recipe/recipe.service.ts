import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/database/entity/recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipe } from './dto/createRecipe.dto';
import { QueryRecipeDto } from './dto/QueryRecipe.dto';
import { ECollection, EOrder } from 'src/common/enum';
import { UserFavorite } from 'src/database/entity/user-favorite.entity';
import { CreateFavorite } from './dto/CreateFavorite.dto';

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

  async saveFavorite(createFavorite: CreateFavorite) {
    return this.userFavoriteRepo.save(createFavorite);
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
      }
    }

    const [recipes, count] = await queryBuilder.getManyAndCount();
    return { recipes, count };
  }

  async findById(id: string, userId?: string) {
    const queryBuilder = this.recipeRepo
      .createQueryBuilder('recipe')
      .innerJoin('recipe.ingredients', 'ingredients')
      .leftJoin(
        'recipe.userFavorite',
        'userFavorite',
        'userFavorite.userId=:userId',
        { userId },
      )

      .select([
        'recipe.id',
        'recipe.recipeName',
        'ingredients',
        'recipe.steps',
        'recipe.calories',
        'recipe.cookTime',
        'recipe.serveTo',
        'recipe.recipeImageUrl',
        'userFavorite'
      ])
      .andWhere('recipe.id =:id', { id });

    return queryBuilder.getOne();
  }
}
