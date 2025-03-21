import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string
}

export class CreateCategory extends CreateCategoryDto {
  imageId: string
}