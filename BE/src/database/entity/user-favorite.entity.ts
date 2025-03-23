import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Recipe } from "./recipe.entity";

@Entity()
export class UserFavorite {
  @PrimaryColumn()
  userId: string

  @ManyToOne(()=>User,{onDelete: 'CASCADE'})
  user: User

  @PrimaryColumn()
  recipeId: string
  
  @ManyToOne(()=>Recipe, {onDelete: 'CASCADE'})
  recipe: Recipe

}