import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * The UpdateProductDto inherits all validation rules from CreateProductDto
 * but makes every property optional.
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
