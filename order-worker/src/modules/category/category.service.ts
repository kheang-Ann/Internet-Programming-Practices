import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPO') // This token matches what we made in DatabaseModule
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(data: Partial<Category>) {
    const category = this.categoryRepo.create(data);
    return await this.categoryRepo.save(category);
  }

  async findAll() {
    return await this.categoryRepo.find();
  }

  async findOne(id: string) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, data: Partial<Category>) {
    const category = await this.findOne(id); // Check if it exists first
    Object.assign(category, data); // Merge new data into found category
    return await this.categoryRepo.save(category);
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    await this.categoryRepo.remove(category);
    return { deleted: true };
  }
}
