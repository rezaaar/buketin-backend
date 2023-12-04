import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  Param,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Res() response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    try {
      const newCategory =
        await this.categoryService.createCategory(createCategoryDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Category has been created successfully',
        newCategory,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Category not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateCategory(
    @Res() response,
    @Param('id') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const updatedCategory = await this.categoryService.updateCategory(
        categoryId,
        updateCategoryDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Category has been successfully updated',
        updatedCategory,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Category not updated!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getAllCategory(@Res() response) {
    try {
      const categoryData = await this.categoryService.getAllCategory();

      return response.status(HttpStatus.OK).json({
        message: 'All category found',
        categoryData,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Category not found!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/:id')
  async getCategory(@Res() response, @Param('id') categoryId: string) {
    try {
      const categoryData = await this.categoryService.getCategory(categoryId);

      return response.status(HttpStatus.OK).json({
        message: 'Category',
        categoryData,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Category not found!',
        error: 'Bad Request',
      });
    }
  }

  @Delete('/:id')
  async deleteCategory(@Res() response, @Param('id') CategoryId: string) {
    try {
      const deletedCategory =
        await this.categoryService.deleteCategory(CategoryId);

      return response.status(HttpStatus.OK).json({
        message: 'Category has been deleted!',
        deletedCategory,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Category not deleted!',
        error: 'Bad Request',
      });
    }
  }
}
