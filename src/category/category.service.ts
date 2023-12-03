import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';
import { ICategory } from 'src/interface/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<ICategory>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    const newCategory = await new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }

  async updateCategory(
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    const existingCategory = await this.categoryModel.findByIdAndUpdate(
      categoryId,
      updateCategoryDto,
      {
        new: true,
      },
    );

    if (!existingCategory) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }

    return existingCategory;
  }

  async getAllCategory(): Promise<ICategory[]> {
    const categoryData = await this.categoryModel.find().exec();

    if (!categoryData || categoryData.length == 0) {
      throw new NotFoundException('Category data not founds!');
    }
    return categoryData;
  }

  async getCategory(categoryId: string): Promise<ICategory> {
    const existingCategory = await this.categoryModel
      .findById(categoryId)
      .exec();

    if (!existingCategory) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }

    return existingCategory;
  }

  async deleteCategory(categoryId: string): Promise<ICategory> {
    const deletedCategory = await this.categoryModel.findById(categoryId);

    if (!deletedCategory) {
      throw new NotFoundException(`Student #${categoryId} not found`);
    }

    await deletedCategory.deleteOne();

    return deletedCategory;
  }
}
