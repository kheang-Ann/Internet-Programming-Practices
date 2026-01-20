import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  private categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Laptops' },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find((cat) => cat.id === id);
  }

  create(data: { name: string }) {
    const newCategory = { id: Date.now(), ...data };
    this.categories.push(newCategory);
    return newCategory;
  }
}
