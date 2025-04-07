import { Uuid } from '@/common/types/common.type';
import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@/exceptions/validation.exception';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Not, Repository } from 'typeorm';
import { CreateDepartureDto } from './dto/create-departure.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdateDepartureDto } from './dto/update-departure.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { DepartureEntity } from './entities/departure.entity';
import { PackageEntity } from './entities/package.entity';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(PackageEntity)
    private readonly packageRepository: Repository<PackageEntity>,
    @InjectRepository(DepartureEntity)
    private readonly departureRepository: Repository<DepartureEntity>,
  ) {}

  async createPackage(dto: CreatePackageDto) {
    const Package = new PackageEntity({
      name: dto.name,
      inclusions: dto.inclusions,
      exclusions: dto.exclusions,
      highlights: dto.highlights,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    await Package.save();
    return plainToInstance(CreatePackageDto, {
      packageId: Package.id,
    });
  }

  findAll() {
    return `This action returns all package`;
  }

  findOne(id: number) {
    return `This action returns a #${id} package`;
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }

  // departure related functions
  async createDeparture(dto: CreateDepartureDto) {
    // check if package id exists and is not archived
    const isExistPackage = await PackageEntity.exists({
      where: {
        id: dto.packageId as Uuid,
        status: Not('archived' as 'active' | 'inactive' | 'archived'),
      },
    });

    if (!isExistPackage) {
      throw new ValidationException(ErrorCode.E004);
    }

    // check if start date is in past
    if (new Date(dto.startDate) < new Date()) {
      throw new ValidationException(ErrorCode.E005);
    }
    // check if end date is in past
    if (new Date(dto.endDate) < new Date()) {
      throw new ValidationException(ErrorCode.E005);
    }
    // check if start date is greater than end date
    if (new Date(dto.startDate) > new Date(dto.endDate)) {
      throw new ValidationException(ErrorCode.E005);
    }

    const Departure = new DepartureEntity({
      startDate: dto.startDate,
      endDate: dto.endDate,
      price: dto.price,
      package: dto.packageId,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    await Departure.save();
    return plainToInstance(CreatePackageDto, {
      packageId: Departure.id,
    });
  }

  // update departure
  async updateDeparture(id: Uuid, dto: UpdateDepartureDto) {
    // this finds by id and does automatically left join
    const departure = await DepartureEntity.findOne({
      where: { id },
      relations: ['package'],
    });

    if (!departure) {
      throw new NotFoundException('Departure not found');
    }

    // Only update provided fields
    if (dto.startDate) departure.startDate = new Date(dto.startDate);
    if (dto.endDate) departure.endDate = new Date(dto.endDate);
    if (dto.price !== undefined) departure.price = dto.price;

    return DepartureEntity.save(departure);
  }
}
