import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  @EventPattern('order_created')
  handleOrderCreated() {
    console.log(`Hello`);
  }
}
