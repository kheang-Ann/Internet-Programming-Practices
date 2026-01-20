import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [
    { id: 1, name: 'MacBook Pro', price: 1999, categoryId: 2 },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((p) => p.id === id);
  }

  create(data: { name: string; price: number; categoryId: number }) {
    const newProduct = { id: Date.now(), ...data };
    this.products.push(newProduct);
    return newProduct;
  }
}
