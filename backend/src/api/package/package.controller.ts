import { Uuid } from '@/common/types/common.type';
import { ApiPublic } from '@/decorators/http.decorators';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CreatePackageDto } from './dto/create-package.dto';
import { PackageService } from './package.service';

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

@ApiTags('package')
@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @ApiPublic({
    type: CreatePackageDto,
    summary: 'Create Package',
  })
  @UseInterceptors(
    FilesInterceptor('media', 10, {
      fileFilter: fileFilter,
      limits: { fileSize: parseInt(process.env.MAX_MEDIA_SIZE) },
    }),
  )
  @Post()
  async createPackage(
    @Body() dto: CreatePackageDto,
    @UploadedFiles() media: Express.Multer.File[],
  ) {
    try {
      const data = await this.packageService.createPackage(dto);

      if (!media || media.length === 0) {
        return data.id;
      }

      // Upload media files for the package and save the media ids in db
      await this.packageService.uploadPackageMedia(media, data.id);
      return data.id;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err.message);
    }
  }

  @ApiPublic({
    summary: 'Soft Delete package',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the package to be deleted.',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Delete(':id')
  async deletePackage(@Param('id', ParseUUIDPipe) id: Uuid) {
    // return await this.packageService.deletePackage(id);
  }

  @ApiPublic({
    summary: 'Get all packages with pagination',
  })
  @Get('')
  async getAllPackages(
    @Query('location') location?: string,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ) {
    return await this.packageService.getAllPackages({
      location,
      limit,
      page,
    });
  }

  @ApiPublic({
    summary: 'Get package by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Get package by id',
    type: String,
    example: '507f1f77bcf86cd799439011',
  })
  @Get(':id')
  async getPackageById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return await this.packageService.getPackageById(id);
  }
}
