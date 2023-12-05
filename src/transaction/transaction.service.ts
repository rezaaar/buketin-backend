import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTransactionDto } from 'src/dto/transaction/create-transaction.dto';
import { ITransaction } from 'src/interface/transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<ITransaction>,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<ITransaction> {
    const newTransaction = await new this.transactionModel(
      createTransactionDto,
    );
    return newTransaction.save();
  }

  async getAllTransaction(): Promise<ITransaction[]> {
    const transactionData = await this.transactionModel
      .find()
      .populate('greeting_card_id')
      .populate('item')
      .exec();

    if (!transactionData || transactionData.length == 0) {
      throw new NotFoundException('Transaction data not founds!');
    }
    return transactionData;
  }

  async updateStatus(
    transactionId: string,
    statusUpdate: string,
  ): Promise<ITransaction> {
    const existingTransaction = await this.transactionModel.findByIdAndUpdate(
      transactionId,
      { status: statusUpdate },
      {
        new: true,
      },
    );

    if (!existingTransaction) {
      throw new NotFoundException(`Transaction not found`);
    }

    return existingTransaction;
  }
}
