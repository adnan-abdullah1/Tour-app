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
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreatePackageDto } from './dto/create-package.dto';
import { ListPackageReqDto } from './dto/list-package.req.dto';
import { PackageResponseDto } from './dto/package-res-dto';
import { ScrapPackageDto } from './dto/scrape.dto';
import { PackageService } from './package.service';
import { ScraperService } from './scraper.service';
import { ObjectId } from 'mongoose';

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
@ApiTags('package')
@Controller('package')
export class PackageController {
  constructor(
    private readonly packageService: PackageService,
    private scrapService: ScraperService,
  ) { }

  @ApiPublic({
    type: CreatePackageDto,
    summary: 'Create Package',
  })
  @UseInterceptors(
    FilesInterceptor('media', 10, {
      fileFilter: fileFilter,
      limits: { fileSize: maxSize },
    }),
  )
  @Post()
  async createPackage(
    @Body() dto: CreatePackageDto,
    @UploadedFiles() media: Express.Multer.File[],
    @Res() res: Response,
  ) {
    try {
      const data: PackageResponseDto =
        await this.packageService.createPackage(dto);

      if (!media || media.length === 0) {
        return res.json(data);
      }

      res.json(data);

      // Upload media files for the package and save the media ids in db
      await this.packageService.uploadPackageMedia(media, data.id);
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err.message);
    }
  }

  @ApiPublic({
    type: ScrapPackageDto,
    summary: 'Scrap Package',
  })
  @Post('scrap')
  async scrapPackage(
    @Body() body: { url: string },
  ): Promise<{ message: string }> {
    try {
      const { url } = body;
      // const url = "https://www.kesari.in/tourIti/Group-Tours/Himachal/HE/ALL-OF-HIMACHAL";

      await this.scrapService.scrapeAndSavePackage(url);
      return { message: 'success' };

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
  async getAllPackages() {
    return await this.packageService.getAllPackages();
  }

  @ApiPublic({
    summary: 'Get package by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Get package by id',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Get(':id')
  async getPackageById(@Param('id', ParseUUIDPipe) id: Uuid) {
    // return await this.packageService.getPackageById(id);
  }

  @ApiPublic({
    summary: 'Get package by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Get package by id',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Get('price-details/:id')
  async getPackagePrice(@Param('id') id: ObjectId) {
    return await this.packageService.getPackagePrice(id);
  }

  @ApiPublic({
    summary: 'Get package by id',
  }) 
  @ApiParam({
    name: 'id',
    description: 'Get package by id',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Get('inclusion-exclusion/:id')
  async getPackageInclusionExclusion(@Param('id') id: ObjectId) {
    return await this.packageService.getPackageInclusionAndExcluisons(id);
  }
}
