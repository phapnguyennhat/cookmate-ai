import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entity/category.entity';
import { In, QueryRunner, Repository } from 'typeorm';
import { CreateCategory, CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
  ){}

  async create(createCategory: CreateCategory, queryRunner?: QueryRunner){
    if(queryRunner){
      return queryRunner.manager.save(Category, createCategory)
    }
    return this.categoryRepo.save(createCategory)
  }

  async getCategoryList (){
    return this.categoryRepo.find({relations: {
      image: true
    }})
  }

  async getCategoryListName (){
     const categories = await this.categoryRepo.find()
     return categories.map(item=>item.name)
  }

  async findCategoryByListName (categoryNameList: string[]){
    return this.categoryRepo.find({
      where: {
        name: In(categoryNameList)
      }
    })
  }
}
