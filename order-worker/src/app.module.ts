import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [OrdersModule, ReceiptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
