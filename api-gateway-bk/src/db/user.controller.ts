import { Controller, Get, Query } from '@nestjs/common';
import { BirthDateValidationPipe } from './dob-validation.pipe';

@Controller('users')
export class UserController {
  @Get('register')
  // eslint-disable-next-line @typescript-eslint/require-await
  async register(@Query('dob', new BirthDateValidationPipe()) dob: string) {
    return {
      message: 'Date of birth is valid!',
      dob,
    };
  }
}
