import { Controller, Get } from '@nestjs/common';

@Controller('receipts')
export class ReceiptsController {
  @Get()
  getAllreceipts() {
    return 'Get receipts';
  }
}
