import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { QueryPromptDto } from './dto/QueryPrompt.dto';
import { GENERATE_COMPLETE_RECIPE_PROMPT, GENERATE_RECIPE_OPTION_PROMPT } from 'src/common/constant';
import { RecipeOptionDto } from './dto/RecipeOption.dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('recipe-option')
  async getRecipeOption(@Body() {prompt}: QueryPromptDto){
    
    const result =await this.openaiService.askAI(prompt + GENERATE_RECIPE_OPTION_PROMPT)
    return JSON.parse(result)
  }

  @Post('complete-recipe')
  async getCompleteRecipe ( @Body() {recipeName, description}: RecipeOptionDto ){
    const prompt = "Recipe Name: "+ recipeName + ', Description: '+ description + GENERATE_COMPLETE_RECIPE_PROMPT
    const result = await this.openaiService.askAI(prompt)
    return JSON.parse(result)
  }
}
