import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  Param,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { OccasionService } from './occasion.service';
import { CreateOccasionDto } from 'src/dto/create-occasion.dto';
import { UpdateOccasionDto } from 'src/dto/update-occasion.dto';

@Controller('occasion')
export class OccasionController {
  constructor(private readonly occasionServive: OccasionService) {}

  @Post()
  async createOccasion(
    @Res() response,
    @Body() createOccasionDto: CreateOccasionDto,
  ) {
    try {
      const newOccasion =
        await this.occasionServive.createOccasion(createOccasionDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Occasion has been created successfully',
        newOccasion,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Occasion not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateOccasion(
    @Res() response,
    @Param('id') occasionId: string,
    @Body() updateOccasionDto: UpdateOccasionDto,
  ) {
    try {
      const updatedOccasion = await this.occasionServive.updateOccasion(
        occasionId,
        updateOccasionDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Occasion has been successfully updated',
        updatedOccasion,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Occasion not updated!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getAllOccasion(@Res() response) {
    try {
      const occasionData = await this.occasionServive.getAllOccasion();

      return response.status(HttpStatus.OK).json({
        message: 'All Occasion found',
        occasionData,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Occasion not found!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/:id')
  async getOccasion(@Res() response, @Param('id') occasionId: string) {
    try {
      const occasionData = await this.occasionServive.getOccasion(occasionId);

      return response.status(HttpStatus.OK).json({
        message: 'Occasion',
        occasionData,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Occasion not found!',
        error: 'Bad Request',
      });
    }
  }

  @Delete('/:id')
  async deleteOccasion(@Res() response, @Param('id') occasionId: string) {
    try {
      const deletedOccasion =
        await this.occasionServive.deleteOccasion(occasionId);

      return response.status(HttpStatus.OK).json({
        message: 'Occasion has been deleted!',
        deletedOccasion,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Occasion not deleted!',
        error: 'Bad Request',
      });
    }
  }
}
