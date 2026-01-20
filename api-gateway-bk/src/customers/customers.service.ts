import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  // A simple hardcoded list of blocked phone numbers
  private readonly blockedPhones = ['+85512345678', '+85599888777'];

  isBlocked(phone: string): boolean {
    // Returns true if the phone is in the list
    return this.blockedPhones.includes(phone);
  }
}
