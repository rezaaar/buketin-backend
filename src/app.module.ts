import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { OccasionService } from './occasion/occasion.service';
import { OccasionController } from './occasion/occasion.controller';
import { CategorySchema } from './schemas/category.schema';
import { OccasionSchema } from './schemas/occasion.schema';
import { GreetingCardService } from './greeting-card/greeting-card.service';
import { GreetingCardController } from './greeting-card/greeting-card.controller';
import { GreetingCardSchema } from './schemas/greeting-card.schema';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionSchema } from './schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:reyreyza32@buketin-db.f6frnmp.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Occasion', schema: OccasionSchema },
      { name: 'GreetingCard', schema: GreetingCardSchema },
      { name: 'Transaction', schema: TransactionSchema },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [
    AppController,
    ProductController,
    CategoryController,
    OccasionController,
    GreetingCardController,
    TransactionController,
  ],
  providers: [
    AppService,
    ProductService,
    CategoryService,
    OccasionService,
    GreetingCardService,
    TransactionService,
  ],
})
export class AppModule {}
