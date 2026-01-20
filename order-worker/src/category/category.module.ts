import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryService],
  exports: [CategoryService], // Must export to be used by GraphQL
})
export class CategoryModule {}
