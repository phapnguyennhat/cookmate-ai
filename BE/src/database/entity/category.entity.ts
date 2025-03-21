import { BaseEntity } from "src/common/baseEntity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { File } from "./file.entity";


@Entity()
export class Category extends BaseEntity {
  @Column({unique: true})
  name: string

  @Column()
  imageId: string

  @OneToOne(()=>File)
  @JoinColumn()
  image: File

}