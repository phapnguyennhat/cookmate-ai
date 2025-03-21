import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { DataSource } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileService } from '../file/file.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,
    private readonly dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
    private readonly fileService: FileService
  ) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|webp|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024, // 🎯 Giới hạn file tối đa 5MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: Express.Multer.File,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {

    const queryRunner = this.dataSource.createQueryRunner()
    let key = undefined
    
    try {
      await queryRunner.connect()
      await queryRunner.startTransaction()

      const responseUploadFile = await this.cloudinaryService.uploadFile(image, 'category')
      key= responseUploadFile.key
      const newImage = await this.fileService.create({...responseUploadFile, format: image.mimetype, name: image.originalname},queryRunner)
      const newCategory = await this.categoryService.create({...createCategoryDto, imageId: newImage.id}, queryRunner)

      await queryRunner.commitTransaction()
      return newCategory
    } catch (error) {
      if(key){
        await this.cloudinaryService.deleteFile(key)
      }
      await queryRunner.rollbackTransaction()
      throw error
    }finally{
      await queryRunner.release()
    }


   
  }
}
