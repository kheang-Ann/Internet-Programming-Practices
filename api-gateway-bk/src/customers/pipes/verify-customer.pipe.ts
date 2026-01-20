import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CustomersService } from '../customers.service';
import { VerifyCustomerDto } from '../dto/verify-customer.dto';

@Injectable()
export class VerifyCustomerPipe implements PipeTransform {
  constructor(private readonly customersService: CustomersService) {}

  transform(value: any): VerifyCustomerDto {
    // 1. Validate Full Name (Trim and Not Empty)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!value.fullName || typeof value.fullName !== 'string') {
      throw new BadRequestException('Full name is required');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const fullName = value.fullName.trim();

    // 2. Validate DOB (Format and Year)
    const dobRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (!dobRegex.test(value.dob)) {
      throw new BadRequestException('DOB must be dd/mm/yyyy');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
    const [_, d, m, y] = value.dob.match(dobRegex);
    if (parseInt(y) >= 2010) {
      throw new BadRequestException('Year must be before 2010');
    }

    // 3. Normalize Phone
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, no-useless-escape, @typescript-eslint/no-unsafe-member-access
    let phone = value.phone.replace(/[\s\-\(\)]/g, '');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (phone.startsWith('0')) phone = '+855' + phone.substring(1);

    // 4. Check if Blocked (DI with Service)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (this.customersService.isBlocked(phone)) {
      throw new ForbiddenException('Customer is blocked');
    }

    // Return the "Cleaned" object
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      fullName,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      dob: value.dob,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      phone,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      nationalId: value.nationalId,
    };
  }
}
