import { Controller } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // @ApiPublic()
  // @Post()
  // create(@Body() createPropertyDto: CreatePropertyDto) {
  //   return this.propertyService.create(createPropertyDto);
  // }

  // @ApiPublic()
  // @Get()
  // async findAllUsers(
  //   @Query() reqDto: ListPropertyReqDto,
  // ): Promise<OffsetPaginatedDto<any>> {
  //   return await this.propertyService.findAll(reqDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.propertyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePropertyDto: UpdatePropertyDto,
  // ) {
  //   return this.propertyService.update(+id, updatePropertyDto);
  // }

  // @ApiPublic({
  //   summary: 'Performs soft delete on a property',
  // })
  // @Delete(':id')
  // async remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return await this.propertyService.remove(id as Uuid);
  // }
}
