import { IsString } from "class-validator";
import { BaseEntity } from "src/common/baseEntity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Ingredient } from "./ingredient.entity";
import { User } from "./user.entity";
import { Category } from "./category.entity";

@Entity()
export class Recipe extends BaseEntity{
  
  @Column({unique: true})
  recipeName: string

  @Column({type: 'text'})
  description: string


  @OneToMany(()=>Ingredient, (ingredient)=>ingredient.recipe, {cascade: true})
  ingredients: Ingredient[]

  @Column('varchar', {array: true})
  steps: string[]

  @Column()
  calories: number

  @Column()
  cookTime: number

  @Column()
  serveTo: number

  @Column('text')
  imagePrompt: string

  @Column()
  userId: string

  @ManyToOne(()=>User)
  user: User

  @Column()
  recipeImageUrl: string

  @ManyToMany(()=>Category , (category)=>category.recipes,{onDelete: 'CASCADE'} )
  categories: Category[]
}