import { BaseEntity } from "src/common/baseEntity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity()
export class Ingredient extends BaseEntity{
  @Column()
  ingredient: string

  @Column()
  icon: string

  @Column()
  quantity: string

  @Column()
  recipeId: string

  @ManyToOne(()=>Recipe, (recipe)=>recipe.ingredients, {onDelete: 'CASCADE'})
  recipe: Recipe
}