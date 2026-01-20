import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { parse, isValid, isBefore } from 'date-fns';

@Injectable()
export class BirthDateValidationPipe implements PipeTransform {
  transform(value: any) {
    // 1. Check if the value exists and is a string
    if (!value || typeof value !== 'string') {
      throw new BadRequestException(
        'Date of birth is required and must be a string',
      );
    }

    // 2. Parse the date using the specific format dd/mm/yyyy
    // The third argument (new Date()) is the reference date for parsing
    const parsedDate = parse(value, 'dd/MM/yyyy', new Date());

    // 3. Validate format (e.g., handles 31/02/1990 as invalid)
    if (!isValid(parsedDate)) {
      throw new BadRequestException(
        'Invalid date format. Please use dd/mm/yyyy',
      );
    }

    // 4. Logic: Must be lower than year 2010
    const thresholdDate = new Date(2010, 0, 1); // January 1, 2010
    if (!isBefore(parsedDate, thresholdDate)) {
      throw new BadRequestException('Birth year must be before 2010');
    }

    return value;
  }
}
