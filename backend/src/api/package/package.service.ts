import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, ObjectId, Schema } from 'mongoose';
import { FirebaseService } from 'src/firebase/firebase/firebase.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { PackageResponseDto } from './dto/package-res-dto';
import { Package } from './entities/package.schema';
import { MediaType } from './types/package.types';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel('Package')
    private readonly packageModel: Model<Package>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async createPackage(dto: CreatePackageDto) {
    const Package = new this.packageModel({
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
      id: Package._id,
    });
  }

  // soft delete package
  // async deletePackage(id: Uuid) {
  //   const Package = await this.packageRepository.findOne({ where: { id } });
  //   if (!Package) {
  //     throw new NotFoundException(`Package not found with id ${id}`);
  //   }

  //   Package.deletedAt = new Date();
  //   await this.packageRepository.save(Package);
  //   return;
  // }

  // get paginated packages
  async getAllPackages() {
    const packages = await this.packageModel
      .find({}, { inclusions: 0, exclusions: 0 })
      .lean();
    return packages.map((pkg) => ({
      ...pkg,
      _id: pkg._id.toString(),
    }));
  }

  // get package by id
  // async getPackageById(id: Uuid) {
  //   const Package = await this.packageRepository.findOne({
  //     where: { id },
  //   });
  //   if (!Package) {
  //     throw new NotFoundException(`Package not found with id ${id}`);
  //   }

  //   return Package;
  // }

  async uploadPackageMedia(files: Express.Multer.File[], packageId: ObjectId) {
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
  async saveMediaUrls(packageMedia: Array<MediaType>, _id: ObjectId) {
    try {
      const Package: any = await this.packageModel.findById(_id);

      if (!Package) {
        throw new NotFoundException(
          `no package was found with given  packageId ${_id}`,
        );
      }

      Package.media = [...(Package.media || []), ...packageMedia];
      await Package.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPackagePrice(id: Schema.Types.ObjectId) {
    const pkg = await this.packageModel.findOne(
      { _id: id },
      { price: 1, title: 1, imageUrls: 1 },
    );

    if (!pkg) return null;

    return {
      ...pkg.toObject(),
      _id: pkg._id.toString(),
    };
  }
  async getPackageInclusionAndExcluisons(id: Schema.Types.ObjectId) {
    const pkg = await this.packageModel.findOne(
      { _id: id },
      { inclusions: 1, exclusions: 1 },
    );

    if (!pkg) return null;

    return {
      ...pkg.toObject(),
      _id: pkg._id.toString(),
    };
  }
}
