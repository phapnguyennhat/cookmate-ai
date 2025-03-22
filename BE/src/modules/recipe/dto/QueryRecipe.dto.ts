import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { QueryPagination } from "src/common/QueryPagination";

export class QueryRecipeDto extends QueryPagination {
  @IsOptional()
  @IsString()
  categoryName?: string
}