/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { NotificationsService } from '../notification/notification.service';

@Injectable()
export class TaskService {
  constructor(private readonly notifier: NotificationsService) {}

  create(task: any) {
    this.notifier.notify('tasks', 'task_created', `Task "${task.title}" create.`);
  }
}
