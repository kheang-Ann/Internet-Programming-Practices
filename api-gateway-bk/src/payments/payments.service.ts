import { forwardRef, Injectable, Inject } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(forwardRef(() => OrdersService))
    private readonly orderService: OrdersService,
  ) {}

  hello() {
    console.log('Hello from payment');
    return 'Hello from payment';
  }
}
