import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
// import { TypeOrmModule } from '@nestjs/typeorm'; // REMOVE THIS
import { DatabaseModule } from '../database/database.module'; // ADD THIS
import { Receipt } from 'src/database/entities/receipts.entity';
import { ReceiptsService } from './receipts.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    // Change TypeOrmModule.forFeature to DatabaseModule.forFeature
    DatabaseModule.forFeature([Receipt]),
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
