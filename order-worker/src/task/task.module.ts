import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [],
  providers: [TaskService],
})
export class TaskModule {}
