import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/baseEntity";
import { Column, Entity } from "typeorm";

@Entity()
export   class User extends BaseEntity {

  @Column({unique: true})
  username: string

  @Column({unique: true})
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken: string;
  
}

export interface IAuthPayload {
  userId: string
}