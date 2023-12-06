import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTransactionDto } from 'src/dto/transaction/create-transaction.dto';
import { ITransaction } from 'src/interface/transaction.interface';
import { UpdateReceiverTransactionDto } from 'src/dto/transaction/update-receiver-transaction.dto';

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

  async getTransaction(transactionId: string): Promise<ITransaction> {
    const existingTransaction = await this.transactionModel
      .findById(transactionId)
      .populate('greeting_card_id')
      .populate('item')
      .exec();

    if (!existingTransaction) {
      throw new NotFoundException(`Transaction #${transactionId} not found`);
    }

    return existingTransaction;
  }

  async getStatistic() {
    const statisticData = await this.transactionModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    return statisticData;
  }

  async claimTransaction(
    transactionId: string,
    updateReceiverTransactionDto: UpdateReceiverTransactionDto,
  ): Promise<ITransaction> {
    const existingTransaction = await this.transactionModel.findByIdAndUpdate(
      transactionId,
      updateReceiverTransactionDto,
      {
        new: true,
      },
    );

    if (!existingTransaction) {
      throw new NotFoundException(`Transaction not found`);
    }

    return existingTransaction;
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
