import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from 'src/interface/product.interface';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<IProduct> {
    const newProduct = await new this.productModel(createProductDto);
    newProduct.populate('occasion');
    newProduct.populate('category');
    return newProduct.save();
  }

  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    const existingProduct = await this.productModel.findByIdAndUpdate(
      productId,
      updateProductDto,
      {
        new: true,
      },
    );

    if (!existingProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    return existingProduct;
  }

  async getAllProducts(): Promise<IProduct[]> {
    const productData = await this.productModel
      .find()
      .populate('category')
      .populate('occasion')
      .exec();

    if (!productData || productData.length == 0) {
      throw new NotFoundException('Student data not founds!');
    }
    return productData;
  }

  async getProduct(productId: string): Promise<IProduct> {
    const existingProduct = await this.productModel
      .findById(productId)
      .populate('category')
      .populate('occasion')
      .exec();

    if (!existingProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    return existingProduct;
  }

  async filterProduct(
    categoryId: string,
    occasionId: string[],
  ): Promise<IProduct[]> {
    const productData = await this.productModel
      .find({ category: categoryId, occasion: { $all: occasionId } })
      .populate('category')
      .populate('occasion')
      .exec();

    if (!productData || productData.length == 0) {
      throw new NotFoundException('Student data not founds!');
    }
    return productData;
  }

  async deleteProduct(productId: string): Promise<IProduct> {
    const deletedProduct = await this.productModel.findById(productId);

    if (!deletedProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    await deletedProduct.deleteOne();

    return deletedProduct;
  }
}
