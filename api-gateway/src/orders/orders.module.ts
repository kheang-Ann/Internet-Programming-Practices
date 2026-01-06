import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PaymentsModule } from 'src/payments/payments.module';
import { NotificationModule } from 'src/notification/notification.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [
    forwardRef(() => PaymentsModule),
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
          queue: 'orders_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    CustomersModule,
    NotificationModule.forFeature([
      // <--- Add bracket
      {
        featureName: 'receipts',
        prefix: '[RECEIPT]',
      },
    ]),
    forwardRef(() => NotificationModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
