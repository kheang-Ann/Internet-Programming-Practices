// src/modules/customers/pipes/dob-format.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DobFormatAndYearPipe implements PipeTransform {
  transform(value: any) {
    // 1. Check if format is exactly dd/mm/yyyy
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(value)) {
      throw new BadRequestException('DOB must be in dd/mm/yyyy format');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const [_, day, month, year] = value.match(regex);
    const date = new Date(+year, +month - 1, +day);

    // 2. Check if it's a real calendar date (prevents 31/02/2000)
    if (
      date.getFullYear() !== +year ||
      date.getMonth() !== +month - 1 ||
      date.getDate() !== +day
    ) {
      throw new BadRequestException('Invalid calendar date');
    }

    // 3. Business Rule: Year must be < 2010
    if (+year >= 2010) {
      throw new BadRequestException('Customer must be born before 2010');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  }
}
