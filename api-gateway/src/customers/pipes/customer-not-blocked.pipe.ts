import { PipeTransform, Injectable, ForbiddenException } from '@nestjs/common';
import { CustomersService } from '../customers.service';

@Injectable()
export class CustomerNotBlockedPipe implements PipeTransform {
  // NestJS automatically injects the service here
  constructor(private readonly customersService: CustomersService) {}

  transform(value: string) {
    if (!value) return value;

    // We ask the service: "Is this phone blocked?"
    const isBlocked = this.customersService.isBlocked(value);

    if (isBlocked) {
      // If blocked, we stop the request immediately
      throw new ForbiddenException(
        'This customer is blocked from making orders',
      );
    }

    return value; // If not blocked, let the phone number pass through
  }
}
