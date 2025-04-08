import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/baseEntity";
import { Check, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { File } from "./file.entity";

export enum AuthBy {
  GOOGLE='GOOGLE',
  GITHUB='GITHUB',
  FACEBOOK='FACEBOOK',
  LOCAL='LOCAL'
}

@Entity()
@Check('credit>=0')
export   class User extends BaseEntity {

  @Column({unique: true, nullable: true})
  username: string

  @Column({unique: true})
  email: string

  @Column()
  name: string

  @Column({type: 'integer', default: 0})
  credit: number

  @Column({type: 'text', nullable: true})
  pref: string

  @Column( {enum:AuthBy, type: 'enum', default: AuthBy.LOCAL})
  authBy: AuthBy

  @Column({nullable: true})
  @Exclude()
  password: string




  @Column({nullable: true})
  avatarId: string

  @OneToOne(()=>File, {eager: true})
  @JoinColumn()
  avatar: File
  
}

export interface IAuthPayload {
  userId: string
}