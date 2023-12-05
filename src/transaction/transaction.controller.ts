import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateTransactionDto } from 'src/dto/transaction/create-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @Res() response,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    try {
      const newTransaction =
        await this.transactionService.createTransaction(createTransactionDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Transaction has been created successfully',
        newTransaction,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Transaction not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getAllTransaction(@Res() response) {
    try {
      const transactionData = await this.transactionService.getAllTransaction();

      return response.status(HttpStatus.OK).json({
        message: 'Transaction data has been successfully retrieved',
        transactionData,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Transaction data not retrieved!',
        error: error,
      });
    }
  }

  @Get('/statistic')
  async getStatistic(@Res() response) {
    try {
      const statisticData = await this.transactionService.getStatistic();

      return response.status(HttpStatus.OK).json({
        message: 'Statistic data has been successfully retrieved',
        statisticData,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Statistic data not retrieved!',
        error: error,
      });
    }
  }

  @Get('/:id')
  async getTransaction(@Res() response, @Param('id') id: string) {
    try {
      const transactionData = await this.transactionService.getTransaction(id);

      return response.status(HttpStatus.OK).json({
        message: 'Transaction data has been successfully retrieved',
        transactionData,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Transaction data not retrieved!',
        error: error,
      });
    }
  }

  @Put('/claim/:id')
  async claimTransaction(
    @Res() response,
    @Param('id') id: string,
    @Body() receiver_data: object,
  ) {
    try {
      const transactionData = await this.transactionService.claimTransaction(
        id,
        receiver_data,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Receiver data on Transaction has been successfully updated',
        transactionData,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Transaction data not updated!',
        error: error,
      });
    }
  }

  @Put('/:id')
  async updateStatus(
    @Res() response,
    @Param('id') id: string,
    @Query('status') status: string,
  ) {
    try {
      const updatedTransaction = await this.transactionService.updateStatus(
        id,
        status,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Transaction has been successfully updated',
        data: updatedTransaction,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Transaction not updated!',
        error: 'Bad Request',
      });
    }
  }
}
