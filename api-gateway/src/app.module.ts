import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Required for process.env
import { DatabaseModule } from './database/database.module'; // Import your custom module
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module'; // Don't forget ProductModule!
import { OrdersModule } from './orders/orders.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationModule } from './notification/notification.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 1. Load environment variables
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Your custom Notification Module
    NotificationModule.forRoot({
      appName: 'API Gateway Lab',
      defaultChannel: 'log',
      enable: true,
    }),

    // 3. REPLACE TypeOrmModule with your custom DatabaseModule
    DatabaseModule.forRoot({
      host: process.env.DB_HOST || 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: 'postgres', // <--- Change 'nest_lab' to 'postgres' (the default)
    }),

    // 4. Feature Modules
    CategoryModule,
    ProductModule,
    OrdersModule,
    ReceiptsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
