import { Uuid } from '@/common/types/common.type';
import { ApiPublic } from '@/decorators/http.decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePackageDto } from './dto/create-package.dto';
import { PackageService } from './package.service';

@ApiTags('package')
@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @ApiPublic({
    type: CreatePackageDto,
    summary: 'Create Package',
  })
  @Post()
  async createPackage(@Body() dto: CreatePackageDto) {
    return await this.packageService.createPackage(dto);
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
    return await this.packageService.deletePackage(id);
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
  @ApiPublic({
    summary: 'Get all packages',
  })
  @ApiParam({
    name: 'id',
    description: 'Get all packages',
    type: String,
  })
  @Get('')
  async getAllPackages(@Param('id', ParseUUIDPipe) id: Uuid) {
    return await this.packageService.getPackageById(id);
  }

  @Get(':id')
  async getPackageById(@Param('id', ParseUUIDPipe) id: Uuid) {
    return await this.packageService.getPackageById(id);
  }
}
