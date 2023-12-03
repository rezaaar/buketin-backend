import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadFileTypeValidator } from './app.validator';

const MAX_SIZE_IN_BYTES = 5 * 1024 * 1024;
const VALID_UPLOADS_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/svg',
  'image/jpg',
];
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload/one')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadOneFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new CustomUploadFileTypeValidator({
            fileType: VALID_UPLOADS_MIME_TYPES,
          }),
        )
        .addMaxSizeValidator({ maxSize: MAX_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }

  @Post('upload/many')
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadFiles(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addValidator(
          new CustomUploadFileTypeValidator({
            fileType: VALID_UPLOADS_MIME_TYPES,
          }),
        )
        .addMaxSizeValidator({ maxSize: MAX_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return files;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
