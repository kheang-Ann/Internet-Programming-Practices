import { Module } from '@nestjs/common';
// Import the Code-First versions instead
import { CategoryCodeFirstResolver } from './resolvers/category.codefirst.resolver';
import { ProductCodeFirstResolver } from './resolvers/product.codefirst.resolver';

// Keep your service modules
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [CategoryModule, ProductModule],
  providers: [CategoryCodeFirstResolver, ProductCodeFirstResolver],
})
export class GraphqlModule {}
