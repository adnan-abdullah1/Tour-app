import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyService {
  // constructor(
  //   @InjectRepository(PropertyEntity)
  //   private readonly propertyRepository: Repository<PropertyEntity>,
  // ) {}
  // async create(createPropertyDto: CreatePropertyDto) {
  //   const newProperty = new PropertyEntity({
  //     name: createPropertyDto.name,
  //     description: createPropertyDto.description,
  //     address: createPropertyDto.address,
  //     propertyClass: createPropertyDto.propertyClass,
  //     createdBy: SYSTEM_USER_ID,
  //     updatedBy: SYSTEM_USER_ID,
  //   });
  //   await newProperty.save();
  //   return plainToInstance(CreatePropertyDto, {
  //     propertyId: newProperty.id,
  //   });
  // }
  // async findAll(
  //   reqDto: ListPropertyReqDto,
  // ): Promise<OffsetPaginatedDto<PropertyResponseDto>> {
  //   const query = this.propertyRepository
  //     .createQueryBuilder('property')
  //     .orderBy('property.createdAt', 'DESC');
  //   const [properties, metaDto] = await paginate<PropertyEntity>(
  //     query,
  //     reqDto,
  //     {
  //       skipCount: false,
  //       takeAll: false,
  //     },
  //   );
  //   return new OffsetPaginatedDto(
  //     plainToInstance(PropertyResponseDto, properties),
  //     metaDto,
  //   );
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} property`;
  // }
  // update(id: number, updatePropertyDto: UpdatePropertyDto) {
  //   return `This action updates a #${id} property`;
  // }
  // async remove(id: Uuid) {
  //   // check if id exists
  //   const property = await this.propertyRepository.exists({ where: { id } });
  //   if (!property) {
  //     throw new NotFoundException(`Property with id ${id} not found`);
  //   }
  //   // Perform soft delete
  //   return await this.propertyRepository.softDelete(id);
  // }
}
