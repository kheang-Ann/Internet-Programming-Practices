import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity'; // Import Product

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  // Add this: One Category has Many Products
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
