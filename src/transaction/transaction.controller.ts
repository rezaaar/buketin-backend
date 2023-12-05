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
        error: 'Bad Request',
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
