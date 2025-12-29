import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body: any) {
    console.log('controller create');
    return this.ordersService.createOrder(body);
  }

  // src/orders/orders.controller.ts
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id); // Changed from deleteOrder to remove
  }
}
