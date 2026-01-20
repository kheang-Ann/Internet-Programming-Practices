/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Receipt } from 'src/database/entities/receipts.entity';
import { NotificationsService } from 'src/notification/notification.service';
import { Repository } from 'typeorm';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

@Injectable()
export class ReceiptsService {
  constructor(
    @Inject('RECEIPT_REPO')
    private readonly receiptRepo: Repository<Receipt>,
    private readonly notifications: NotificationsService,
  ) {}

  // 1. Add findOne (needed for update/remove/get by id)
  async findOne(receiptId: string) {
    const receipt = await this.receiptRepo.findOne({
      where: { receiptId } as any,
    });
    if (!receipt) {
      throw new NotFoundException(`Receipt with ID ${receiptId} not found`);
    }
    return receipt;
  }

  // 2. Add findAll (Fixes error TS2339 on line 23)
  async findAll() {
    return await this.receiptRepo.find();
  }

  // 3. Add remove (Fixes error TS2339 on line 44)
  async remove(id: string) {
    const receipt = await this.findOne(id);
    await this.receiptRepo.remove(receipt);
    return { deleted: true, id };
  }

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
    const receipt = await this.findOne(receiptId);

    if (dto.issuedAt !== undefined) receipt.issuedAt = new Date(dto.issuedAt);
    if (dto.name !== undefined) receipt.name = dto.name;
    if (dto.price !== undefined) receipt.price = dto.price;

    const saved = await this.receiptRepo.save(receipt);

    this.notifications.notify('receipts', 'receipt_updated', {
      receiptId: saved.receiptId,
      price: saved.price,
    });

    return saved;
  }
}
