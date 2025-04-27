import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema } from 'mongoose';
import { FirebaseService } from 'src/firebase/firebase/firebase.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from './entities/package.schema';
import { MediaType } from './types/package.types';

@Injectable()
export class PackageService {
  private readonly logger = new Logger(PackageService.name);

  constructor(
    @InjectModel('Package')
    private readonly packageModel: Model<Package>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async createPackage(dto: CreatePackageDto) {
    try {
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

      const res = await Package.save();
      return res;
    } catch (err) {
      throw new Error(err);
    }
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
  async getAllPackages({
    location,
    limit = 10,
    page = 1,
  }: {
    location?: string;
    limit?: number;
    page?: number;
  }) {
    const filter: any = {};

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const packages = await this.packageModel
      .find(filter, { inclusions: 0, exclusions: 0 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Map _id to string and return the result
    return packages.map((pkg) => ({
      ...pkg,
      _id: pkg._id.toString(),
    }));
  }

  // get package by id
  async getPackageById(id: ObjectId) {
    const Package = await this.packageModel.findById(id).lean();
    if (!Package) {
      throw new NotFoundException(`Package not found with id ${id}`);
    }

    return Package;
  }

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
      return await Package.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPackagePrice(id: Schema.Types.ObjectId) {
    const pkg = await this.packageModel.findOne(
      { _id: id },
      { price: 1, title: 1, imageUrls: 1, redirectionUrl: 1 },
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

  async saveSyncData(data) {
    try {
      const packages = await this.packageModel.insertMany(data);
      return packages;
    } catch (err) {
      this.logger.error('Error saving data to database', err);
      throw new Error('Error saving data to database');
    }
  }
}
