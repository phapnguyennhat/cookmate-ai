import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/database/entity/category.entity';
import { FileModule } from '../file/file.module';

@Module({
  imports: [CloudinaryModule,FileModule, TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
  
})
export class CategoryModule {}
