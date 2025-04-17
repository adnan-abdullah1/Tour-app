import { Uuid } from '@/common/types/common.type';
import { ApiPublic } from '@/decorators/http.decorators';
import {
  BadRequestException,
  Controller,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PackageService } from '../package.service';

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'video/mp4',
  'video/mpeg',
];

const fileFilter = (req, file, callback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new BadRequestException('Only image and video files are allowed!'),
      false,
    );
  }
};

const maxSize = 5 * 1024 * 1024;

@Controller('media')
export class MediaController {
  constructor(private readonly packageService: PackageService) {}
  private readonly logger = new Logger(MediaController.name);

  @ApiPublic()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: fileFilter,
      limits: { fileSize: maxSize },
    }),
  )

  // Upload media files for the package
  @Post(':id')
  async uploadPackageMedia(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    // this.packageService.uploadPackageMedia(files, id);
    return 'Files uploaded successfully';
  }
}
