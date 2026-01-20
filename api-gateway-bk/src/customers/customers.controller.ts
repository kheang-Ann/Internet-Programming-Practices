import { Controller, Post, Body } from '@nestjs/common';
import { VerifyCustomerPipe } from './pipes/verify-customer.pipe';
import { VerifyCustomerDto } from './dto/verify-customer.dto';

@Controller('customers')
export class CustomersController {
  @Post('verify')
  // We apply the Pipe to the entire @Body
  verify(@Body(VerifyCustomerPipe) body: VerifyCustomerDto) {
    return {
      ok: true,
      normalized: body, // This 'body' is now the cleaned object returned by the pipe
    };
  }
}
