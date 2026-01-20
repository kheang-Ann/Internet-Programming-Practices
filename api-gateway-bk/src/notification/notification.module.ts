import { DynamicModule, Module, Global } from '@nestjs/common';
import { NOTIFICATION_FEATURES, NOTIFICATION_OPTIONS } from './constants';
import {
  NotificationModuleOptions,
  NotificationFeatureOptions,
} from './interface';
import { NotificationsService } from './notification.service';

@Global() // Making it global so you don't have to import it everywhere
@Module({})
export class NotificationModule {
  static forRoot(options: NotificationModuleOptions): DynamicModule {
    return {
      module: NotificationModule,
      providers: [
        {
          provide: NOTIFICATION_OPTIONS,
          useValue: options,
        },
        {
          provide: NOTIFICATION_FEATURES,
          useValue: [], // Default empty features so Service doesn't crash
        },
        NotificationsService,
      ],
      exports: [NotificationsService],
    };
  }

  static forFeature(features: NotificationFeatureOptions[]): DynamicModule {
    return {
      module: NotificationModule,
      providers: [
        {
          provide: NOTIFICATION_FEATURES,
          useValue: features,
        },
        // We don't put NotificationsService here if forRoot is Global
      ],
    };
  }
}
