import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { Category } from './entities/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    // This provides the 'CATEGORY_REPO' token to the service above
    DatabaseModule.forFeature([Category]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
