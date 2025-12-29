import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { ReceiptsService } from './receipts.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receipt]),
    NotificationModule.forFeature([
      {
        featureName: 'receipts',
        prefix: '[RECEIPTS]',
        channels: ['log'], // only log for receipts
      },
    ]),
  ],
  providers: [ReceiptsService],
  controllers: [ReceiptsController],
})
export class ReceiptsModule {}
