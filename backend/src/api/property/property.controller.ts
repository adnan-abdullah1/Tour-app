import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
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
  Query,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { ListPropertyReqDto } from './dto/list-property.req.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @ApiPublic()
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  @ApiPublic()
  @Get()
  async findAllUsers(
    @Query() reqDto: ListPropertyReqDto,
  ): Promise<OffsetPaginatedDto<any>> {
    return await this.propertyService.findAll(reqDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(+id, updatePropertyDto);
  }

  @ApiPublic({
    summary: 'Performs soft delete on a property',
  })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.propertyService.remove(id as Uuid);
  }
}
