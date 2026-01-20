import { Inject, Injectable } from '@nestjs/common';
import { NOTIFICATION_FEATURES, NOTIFICATION_OPTIONS } from './constants';
import type {
  NotificationFeatureOptions,
  NotificationModuleOptions,
  NotificationChannel,
} from './interface';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_OPTIONS)
    private readonly options: NotificationModuleOptions,

    @Inject(NOTIFICATION_FEATURES)
    private readonly features: NotificationFeatureOptions[],
  ) {}

  // Get feature config by name
  private getFeature(
    featureName: string,
  ): NotificationFeatureOptions | undefined {
    return this.features.find((f) => f.featureName === featureName);
  }

  // Resolve channels (feature override -> global default)
  private resolveChannels(
    feature?: NotificationFeatureOptions,
  ): NotificationChannel[] {
    if (!this.options.enable) return [];
    if (feature?.channels?.length) return feature.channels;
    return [this.options.defaultChannel];
  }

  notify(featureName: string, event?: string, payload?: any) {
    const feature = this.getFeature(featureName);

    // Challenge A: Check feature-specific enable flag
    // If feature.enable is explicitly false, skip even if global is true
    if (feature?.enable === false) {
      return { skipped: true, reason: `feature ${featureName} is disabled` };
    }

    // Check global master switch
    if (!this.options.enable) {
      return { skipped: true, reason: 'notifications disabled globally' };
    }

    const channels = this.resolveChannels(feature);
    const prefix = feature?.prefix ?? `[${featureName.toUpperCase()}]`;
    const message = `${prefix} (${this.options.appName}) ${event}`;

    for (const ch of channels) {
      console.log(`[${ch.toUpperCase()}] ${message}`, payload);
    }

    return { ok: true, channels, featureName, event };
  }
}
