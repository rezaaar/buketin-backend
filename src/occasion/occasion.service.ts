import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOccasionDto } from 'src/dto/create-occasion.dto';
import { UpdateOccasionDto } from 'src/dto/update-occasion.dto';
import { IOccasion } from 'src/interface/occasion.interface';

@Injectable()
export class OccasionService {
  constructor(
    @InjectModel('Occasion') private occasionModel: Model<IOccasion>,
  ) {}

  async createOccasion(
    createOccasionDto: CreateOccasionDto,
  ): Promise<IOccasion> {
    const newOccasion = await new this.occasionModel(createOccasionDto);
    return newOccasion.save();
  }

  async updateOccasion(
    occasionId: string,
    updateOccasionDto: UpdateOccasionDto,
  ): Promise<IOccasion> {
    const existingOccasion = await this.occasionModel.findByIdAndUpdate(
      occasionId,
      updateOccasionDto,
      {
        new: true,
      },
    );

    if (!existingOccasion) {
      throw new NotFoundException(`Occasion #${occasionId} not found`);
    }

    return existingOccasion;
  }

  async getAllOccasion(): Promise<IOccasion[]> {
    const occasionData = await this.occasionModel.find().exec();

    if (!occasionData || occasionData.length == 0) {
      throw new NotFoundException('Occasion data not founds!');
    }
    return occasionData;
  }

  async getOccasion(occasionId: string): Promise<IOccasion> {
    const existingOccasion = await this.occasionModel
      .findById(occasionId)
      .exec();

    if (!existingOccasion) {
      throw new NotFoundException(`Occasion #${occasionId} not found`);
    }

    return existingOccasion;
  }

  async deleteOccasion(occasionId: string): Promise<IOccasion> {
    const deletedOccasion = await this.occasionModel.findById(occasionId);

    if (!deletedOccasion) {
      throw new NotFoundException(`Occasion #${occasionId} not found`);
    }

    await deletedOccasion.deleteOne();

    return deletedOccasion;
  }
}
