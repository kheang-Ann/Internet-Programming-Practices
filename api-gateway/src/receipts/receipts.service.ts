/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { NotificationsService } from 'src/notification/notification.service';
import { Repository } from 'typeorm';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

@Injectable()
export class ReceiptsService {
  [x: string]: any;
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
    private readonly notifications: NotificationsService,
  ) {}

  async create(dto: CreateReceiptDto) {
    const saved = await this.receiptRepo.save(
      this.receiptRepo.create({
        issuseAt: new Date(dto.issuedAt),
        name: dto.name,
        price: dto.price,
      }),
    );

    this.notifications.notify('receipts', 'receipt_created', {
      receiptId: saved.receiptId,
      price: saved.price,
    });

    return saved;
  }

  async update(receiptId: string, dto: UpdateReceiptDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const receipt = await this.findOne(receiptId);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (dto.issuedAt !== undefined) receipt.issuedAt = new Date(dto.issuedAt);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (dto.name !== undefined) receipt.name = dto.name;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (dto.price !== undefined) receipt.price = dto.price;

    const saved = await this.receiptRepo.save(receipt);

    this.notifications.notify('receipts', 'receipt_updated', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      receiptId: saved.receiptId,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      price: saved.price,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return saved;
  }
}
