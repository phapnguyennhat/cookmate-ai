import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ECollection, EOrder } from "src/common/enum";
import { QueryPagination } from "src/common/QueryPagination";



export class QueryRecipeDto extends QueryPagination {
  @IsOptional()
  @IsString()
  categoryName?: string

  @IsOptional()
  @IsEnum(EOrder)
  createAt:  EOrder

  @IsOptional()
  @IsEnum(ECollection)
  collection?: ECollection
}