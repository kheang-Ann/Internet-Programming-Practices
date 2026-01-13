import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class DemoController {
  @MessagePattern({ cmd: 'admin_ping' })
  pingAdmin() {
    return { ok: true, scope: 'admin' };
  }

  @MessagePattern({ cmd: 'orders_ping' })
  pingOrders() {
    return { ok: true, scope: 'order.read' };
  }
}
