import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthBy, User } from 'src/database/entity/user.entity';
import { QueryRunner, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { TokenPayload } from 'google-auth-library';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async findById(id: string){
    return this.userRepo.findOneBy({id})
  }

  async findByEmail(email: string){
    return this.userRepo.findOneBy({email})
  }

  async findByUsername(username: string){
    return this.userRepo.findOneBy({username})
  }

  async update(userId: string, updateUserDto: UpdateUserDto, queryRunner?:QueryRunner) {
    if(queryRunner){
      return queryRunner.manager.update(User, userId, updateUserDto)
    }
    return this.userRepo.update(userId, updateUserDto)
  }

  async create(createUserDto: CreateUserDto){
    return this.userRepo.save(createUserDto)
  }

  async createWithGoogle(userData: TokenPayload){
    return this.userRepo.save({
      email: userData.email,
      name: userData.name,
      authBy: AuthBy.GOOGLE
    })
  }






}
