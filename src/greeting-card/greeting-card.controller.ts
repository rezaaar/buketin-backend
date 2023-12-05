import { Body, Controller, HttpStatus, Post, Get, Res } from '@nestjs/common';
import { CreateGreetingCardDto } from 'src/dto/greeting-card/create-greeting-cart.dto';
import { GreetingCardService } from './greeting-card.service';

@Controller('greeting-card')
export class GreetingCardController {
  constructor(private readonly greetingCardService: GreetingCardService) {}

  @Post()
  async createGreetingCard(
    @Res() response,
    @Body() createGreetingCardDto: CreateGreetingCardDto,
  ) {
    try {
      const newGreetingCard = await this.greetingCardService.createGreetingCard(
        createGreetingCardDto,
      );

      return response.status(HttpStatus.CREATED).json({
        message: 'Greeting card has been created successfully',
        data: newGreetingCard,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Greeting card not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getAllGreetingCard(@Res() response) {
    try {
      const greetingCardData =
        await this.greetingCardService.getAllGreetingCard();
      return response.status(HttpStatus.OK).json({
        message: 'Greeting card data fetched successfully',
        data: greetingCardData,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Greeting card data not fetched!',
        error: 'Bad Request',
      });
    }
  }
}
