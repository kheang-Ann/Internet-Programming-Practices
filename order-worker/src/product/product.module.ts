import { Module } from '@nestjs/common';
import { ProductService } from './product.service';

@Module({
  providers: [ProductService],
  exports: [ProductService], // Must export to be used by GraphQL
})
export class ProductModule {}
