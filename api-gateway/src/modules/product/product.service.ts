import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPO') private readonly productRepo: Repository<Product>,
    @Inject('CATEGORY_REPO')
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateProductDto) {
    // Challenge check: Does the category actually exist?
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');

    const product = this.productRepo.create(dto);
    return await this.productRepo.save(product);
  }

  async findAll() {
    // 'relations' allows you to see the category details inside the product object
    return await this.productRepo.find({ relations: ['category'] });
  }

  async findOne(id: string) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'], // Load the category relation
    });
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findOne(id); // Ensure product exists first

    // If updating categoryId, we must verify the new category exists
    if (dto.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { id: dto.categoryId },
      });
      if (!category) throw new NotFoundException('New Category not found');
    }

    // Merge the changes into the existing product entity
    Object.assign(product, dto);
    return await this.productRepo.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id); // Verify it exists before deleting
    await this.productRepo.remove(product);
    return { deleted: true, id };
  }
}
