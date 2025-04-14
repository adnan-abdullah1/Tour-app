import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { paginate } from '@/utils/offset-pagination';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { FirebaseService } from 'src/firebase/firebase/firebase.service';
import { Repository } from 'typeorm';
import { CreatePackageDto } from './dto/create-package.dto';
import { ListPackageReqDto } from './dto/list-package.req.dto';
import { PackageResponseDto } from './dto/package-res-dto';
import { DepartureEntity } from './entities/departure.entity';
import { PackageEntity } from './entities/package.entity';
import { MediaType } from './types/package.types';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(PackageEntity)
    private readonly packageRepository: Repository<PackageEntity>,
    @InjectRepository(DepartureEntity)
    private readonly departureRepository: Repository<DepartureEntity>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async createPackage(dto: CreatePackageDto) {
    const Package = new PackageEntity({
      name: dto.name,
      location: dto.location,
      description: dto.description,
      price: dto.price,
      redirectUrl: dto.redirectUrl,
      inclusions: dto.inclusions,
      exclusions: dto.exclusions,
      highlights: dto.highlights,
      startDate: dto.startDate,
      endDate: dto.endDate,
      daysPlan: dto.daysPlan,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    await Package.save();
    return plainToInstance(PackageResponseDto, {
      id: Package.id,
    });
  }

  // soft delete package
  async deletePackage(id: Uuid) {
    const Package = await this.packageRepository.findOne({ where: { id } });
    if (!Package) {
      throw new NotFoundException(`Package not found with id ${id}`);
    }

    Package.deletedAt = new Date();
    await this.packageRepository.save(Package);
    return;
  }

  // get paginated packages
  async getAllPackages(
    reqDto: ListPackageReqDto,
  ): Promise<OffsetPaginatedDto<PackageResponseDto>> {
    const query = this.packageRepository
      .createQueryBuilder('user')
      .orderBy('user.createdAt', 'DESC');
    const [users, metaDto] = await paginate<PackageEntity>(query, reqDto, {
      skipCount: false,
      takeAll: false,
    });
    return new OffsetPaginatedDto(
      plainToInstance(PackageResponseDto, users),
      metaDto,
    );
  }

  // get package by id
  async getPackageById(id: Uuid) {
    const Package = await this.packageRepository.findOne({
      where: { id },
    });
    if (!Package) {
      throw new NotFoundException(`Package not found with id ${id}`);
    }

    return Package;
  }

  async uploadPackageMedia(files: Express.Multer.File[], packageId: Uuid) {
    try {
      const packageMedia: Array<MediaType> =
        await this.firebaseService.uploadPackageMedia(files, packageId);
      await this.saveMediaUrls(packageMedia, packageId);
    } catch (err) {
      //we need to add log to keep track fo what happened while uploading to firebase
      console.log(err);
      throw new Error(err);
    }
  }

  // save media urls
  async saveMediaUrls(packageMedia: Array<MediaType>, id: Uuid) {
    try {
      const Package = await PackageEntity.findOne({ where: { id } });
      if (!Package) {
        throw new NotFoundException(
          `no package was found with given  packageId ${id}`,
        );
      }

      Package.media = [...(Package.media || []), ...packageMedia];
      await this.packageRepository.save(Package);
    } catch (err) {
      throw new Error(err);
    }
  }
}
