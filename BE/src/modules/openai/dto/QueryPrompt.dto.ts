import { IsNotEmpty, IsString } from "class-validator";

export class QueryPromptDto {
  @IsNotEmpty()
  @IsString()
  prompt: string

  
}