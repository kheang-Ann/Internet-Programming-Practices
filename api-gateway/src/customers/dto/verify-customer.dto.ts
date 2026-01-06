// src/modules/customers/dto/verify-customer.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class VerifyCustomerDto {
  @IsString()
  fullName: string;

  @IsString()
  dob: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  nationalId?: string;
}
