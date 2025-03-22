import { BaseEntity } from "src/common/baseEntity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { File } from "./file.entity";
import { Recipe } from "./recipe.entity";


@Entity()
export class Category extends BaseEntity {
  @Column({unique: true})
  name: string

  @Column()
  imageId: string

  @OneToOne(()=>File, )
  @JoinColumn()
  image: File

  
  @ManyToMany(()=>Recipe, (recipe)=>recipe.categories)
  @JoinTable({name: 'recipe_category'})
  recipes: Recipe[]
}