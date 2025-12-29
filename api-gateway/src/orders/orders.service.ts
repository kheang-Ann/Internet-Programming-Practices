import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationsService } from 'src/notification/notification.service';

@Injectable()
export class OrdersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject('ORDERS_SERVICE') private client: ClientProxy,
    private readonly notifications: NotificationsService,
  ) {}

  createOrder(orderDto: any) {
    // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unsafe-assignment
    this.client.emit('order_created', { order: orderDto, createdAt: new Date().toISOString() });

    this.notifications.notify('orders', 'order_created', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      order: orderDto,
      createdAt: new Date().toISOString(),
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { status: 'Order accepted', order: orderDto };
  }
}
