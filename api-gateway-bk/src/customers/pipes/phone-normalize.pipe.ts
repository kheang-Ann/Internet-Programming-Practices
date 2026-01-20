// src/modules/customers/pipes/phone-normalize.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PhoneNormalizePipe implements PipeTransform {
  transform(value: string) {
    if (!value) return value;

    // Remove spaces, dashes, and parentheses
    // eslint-disable-next-line no-useless-escape
    let cleaned = value.replace(/[\s\-\(\)]/g, '');

    // Check if it's just letters (invalid)
    if (/[a-zA-Z]/.test(cleaned)) {
      throw new BadRequestException('Phone number cannot contain letters');
    }

    // If starts with 0, replace with +855
    if (cleaned.startsWith('0')) {
      cleaned = '+855' + cleaned.substring(1);
    }

    return cleaned;
  }
}
