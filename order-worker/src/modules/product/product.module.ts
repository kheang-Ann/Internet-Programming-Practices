import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    // We need both repos so we can check if category exists when creating a product
    DatabaseModule.forFeature([Product, Category]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
