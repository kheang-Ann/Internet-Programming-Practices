import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { EVENT_PUBLISHER } from 'src/core/tokens';

type EventPublisher = { publish: (event: string, payload: any) => void };

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
    @Inject(EVENT_PUBLISHER)
    private readonly publisher: EventPublisher,
  ) {}

  notify(event: string, payload: any) {
    console.log(`[NOTIFY] ${event}`, payload);

    // Example: call OrdersService for extra info (fake)
    // this.ordersService.deleteOrder(); // don't actually do it, just for illustration

    return { ok: true };
  }
}
