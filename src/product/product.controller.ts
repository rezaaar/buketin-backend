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
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Res() response,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      const newProduct =
        await this.productService.createProduct(createProductDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Product has been created successfully',
        newProduct,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateProduct(
    @Res() response,
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const updatedProduct = await this.productService.updateProduct(
        productId,
        updateProductDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Product has been successfully updated',
        updatedProduct,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not updated!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getAllProducts(@Res() response) {
    try {
      const productData = await this.productService.getAllProducts();

      return response.status(HttpStatus.OK).json({
        message: 'All products found',
        productData,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not found!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/:id')
  async getProduct(@Res() response, @Param('id') productId: string) {
    try {
      const productData = await this.productService.getProduct(productId);

      return response.status(HttpStatus.OK).json({
        message: 'Product',
        productData,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not found!',
        error: 'Bad Request',
      });
    }
  }

  @Delete('/:id')
  async deleteProduct(@Res() response, @Param('id') productId: string) {
    try {
      const deletedProduct = await this.productService.deleteProduct(productId);

      return response.status(HttpStatus.OK).json({
        message: 'Product has been deleted!',
        deletedProduct,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not deleted!',
        error: 'Bad Request',
      });
    }
  }
}
