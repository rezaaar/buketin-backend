import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGreetingCardDto } from 'src/dto/greeting-card/create-greeting-cart.dto';
import { IGreetingCard } from 'src/interface/greeting-card.interface';

@Injectable()
export class GreetingCardService {
  constructor(
    @InjectModel('GreetingCard')
    private greetingCardModel: Model<IGreetingCard>,
  ) {}

  async createGreetingCard(
    createGreetingCardDto: CreateGreetingCardDto,
  ): Promise<IGreetingCard> {
    const newGreetingCard = await new this.greetingCardModel(
      createGreetingCardDto,
    );
    return newGreetingCard.save();
  }

  async getAllGreetingCard(): Promise<IGreetingCard[]> {
    const greetingCardData = await this.greetingCardModel.find().exec();

    if (!greetingCardData || greetingCardData.length == 0) {
      throw new NotFoundException('Greeting Card data not founds!');
    }
    return greetingCardData;
  }
}
