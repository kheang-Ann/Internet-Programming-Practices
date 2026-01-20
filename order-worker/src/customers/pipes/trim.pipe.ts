// src/modules/customers/pipes/trim.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (typeof value !== 'string') return value;

    const trimmed = value.trim();
    if (trimmed.length === 0) {
      throw new BadRequestException('Field cannot be empty or just spaces');
    }
    return trimmed;
  }
}
