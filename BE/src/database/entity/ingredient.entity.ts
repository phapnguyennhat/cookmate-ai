import { BaseEntity } from "src/common/baseEntity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity()
export class Ingredient {

  @PrimaryGeneratedColumn('uuid')
  id: string


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