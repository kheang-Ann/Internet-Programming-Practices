import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
// 1. Import the Pipe and DTO from your customers module
import { VerifyCustomerPipe } from '../customers/pipes/verify-customer.pipe';
import { VerifyCustomerDto } from '../customers/dto/verify-customer.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  // 2. Apply the VerifyCustomerPipe to the entire request body
  create(@Body(VerifyCustomerPipe) body: VerifyCustomerDto) {
    console.log('Controller create: Customer verified and cleaned');
    return this.ordersService.createOrder(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
