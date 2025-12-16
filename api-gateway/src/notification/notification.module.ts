import { forwardRef, Module } from '@nestjs/common';
import { NotificationsService } from './notification.service';
import { OrdersModule } from 'src/orders/orders.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [forwardRef(() => OrdersModule), CoreModule],
  providers: [NotificationsService],
  controllers: [],
  exports: [NotificationsService],
})
export class NotificationModule {}
