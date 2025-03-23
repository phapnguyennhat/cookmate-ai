import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';
import RequestWithUser from 'src/common/requestWithUser.interface';
import { GuruaiService } from '../guruai/guruai.service';
import { RecipeOptionDto } from './dto/RecipeOption.dto';
import { OpenaiService } from '../openai/openai.service';
import {  GENERATE_RECIPE_OPTION_PROMPT } from 'src/common/constant';
import { QueryPromptDto } from '../openai/dto/QueryPrompt.dto';
import { CategoryService } from '../category/category.service';
import { get_complete_recipe_prompt } from 'src/util/func';
import { DataSource } from 'typeorm';
import { UserService } from '../user/user.service';
import { QueryRecipeDto } from './dto/QueryRecipe.dto';
import { CreateFavoriteDto } from './dto/CreateFavorite.dto';

@Controller('')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly guruaiService: GuruaiService,
    private readonly openaiService: OpenaiService,
    private readonly categoryService:CategoryService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: RequestWithUser,
    @Body() { recipeName, description }: RecipeOptionDto,
  ) {
    const recipe = await this.recipeService.findByName(recipeName);
    if (recipe) {
      throw new BadRequestException(
        `This recipe name has been created already!`,
      );
    }
    const categoryListName = await this.categoryService.getCategoryListName()
    
    const prompt =
      'Recipe Name: ' +
      recipeName +
      ', Description: ' +
      description + get_complete_recipe_prompt(categoryListName);

      const queryRunner = this.dataSource.createQueryRunner()

      try {
        await queryRunner.connect()
        await queryRunner.startTransaction()
        await this.userService.update(req.user.id, {credit: req.user.credit-1})
        
        const result = await this.openaiService.askAI(prompt);
        const completedRecipe = JSON.parse(result);
        const { url } = await this.guruaiService.generateImage(
          completedRecipe.imagePrompt,
        );

        const categories = await this.categoryService.findCategoryByListName(completedRecipe.category)

        console.log(completedRecipe.category)

        const newRecipe = await this.recipeService.create({
          ...completedRecipe,
          userId: req.user.id,
          recipeImageUrl: url,
          categories
          
        });

        await queryRunner.commitTransaction()
        return { id: newRecipe.id };
      } catch (error) {
        await queryRunner.rollbackTransaction()
        throw error
      } finally{
        await queryRunner.release()
      }

  }

  @Post('recipe/option')
  @UseGuards(JwtAuthGuard)
  async getRecipeOption(@Body() { prompt }: QueryPromptDto) {
    const result = await this.openaiService.askAI(
      prompt + GENERATE_RECIPE_OPTION_PROMPT,
    );
    return JSON.parse(result);
  }

  @Get('recipe')
  @UseGuards(JwtAuthGuard)
  async findRecipe (@Query() queryRecipeDto: QueryRecipeDto, @Req( )req: RequestWithUser){
    return this.recipeService.findRecipe(queryRecipeDto, req.user.id)
    
  }

  @Get('recipe/:id')
  @UseGuards(JwtAuthGuard)
  async findRecipeById(@Param('id') id: string, @Req() req: RequestWithUser){
    return this.recipeService.findById(id, req.user.id)
  }

  @Post('user/recipe/favorite')
  @UseGuards(JwtAuthGuard)
  async saveFavorite (@Req() req: RequestWithUser, @Body() {recipeId}: CreateFavoriteDto){
    return this.recipeService.saveFavorite({userId: req.user.id, recipeId})
  }

}
