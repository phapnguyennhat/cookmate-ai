import { IsNotEmpty, IsString } from "class-validator";

export class CreateFavoriteDto {
  @IsNotEmpty()
  @IsString()
  recipeId: string
}

export class CreateFavorite extends CreateFavoriteDto{
  userId: string
}