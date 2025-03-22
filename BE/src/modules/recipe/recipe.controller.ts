import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';
import RequestWithUser from 'src/common/requestWithUser.interface';
import { GuruaiService } from '../guruai/guruai.service';
import { RecipeOptionDto } from './dto/RecipeOption.dto';
import { OpenaiService } from '../openai/openai.service';
import { GENERATE_COMPLETE_RECIPE_PROMPT, GENERATE_RECIPE_OPTION_PROMPT } from 'src/common/constant';
import { QueryPromptDto } from '../openai/dto/QueryPrompt.dto';

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly guruaiService: GuruaiService,
    private readonly openaiService: OpenaiService,
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
    const prompt =
      'Recipe Name: ' +
      recipeName +
      ', Description: ' +
      description +
      GENERATE_COMPLETE_RECIPE_PROMPT;
    const result = await this.openaiService.askAI(prompt);
    const completedRecipe = JSON.parse(result);
    const { url } = await this.guruaiService.generateImage(
      completedRecipe.imagePrompt,
    );

    await this.recipeService.create({
      ...completedRecipe,
      userId: req.user.id,
      recipeImageUrl: url,
    });
    return { message: 'Create recipe successfully' };
  }

  @Post('option')
  @UseGuards(JwtAuthGuard)
  async getRecipeOption(@Body() { prompt }: QueryPromptDto) {
    const result = await this.openaiService.askAI(
      prompt + GENERATE_RECIPE_OPTION_PROMPT,
    );
    return JSON.parse(result);
  }

  
}
