// customers.module.ts
import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  controllers: [CustomersController], // Tells Nest to listen for these routes
  providers: [CustomersService], // Tells Nest this service is available for DI
  exports: [CustomersService],
})
export class CustomersModule {}
