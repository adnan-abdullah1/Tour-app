import { Uuid } from '@/common/types/common.type';
import { ApiPublic } from '@/decorators/http.decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDepartureDto } from './dto/create-departure.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdateDepartureDto } from './dto/update-departure.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
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

  @Get()
  findAll() {
    return this.packageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageService.remove(+id);
  }

  // departure controller
  @ApiPublic({
    type: CreatePackageDto,
    summary: 'Create Departures',
  })
  @Post('/departure')
  createDeparture(@Body() dto: CreateDepartureDto) {
    return this.packageService.createDeparture(dto);
  }

  @ApiPublic({
    type: CreatePackageDto,
    summary: 'Create Departures',
  })
  @Put('/departure/:id')
  updateDeparture(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Body() dto: UpdateDepartureDto,
  ) {
    return this.packageService.updateDeparture(id, dto);
  }
}
