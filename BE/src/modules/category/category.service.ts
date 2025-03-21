import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entity/category.entity';
import { QueryRunner, Repository } from 'typeorm';
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
}
