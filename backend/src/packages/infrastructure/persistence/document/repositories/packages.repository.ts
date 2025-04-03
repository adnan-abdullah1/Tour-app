import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PackagesSchemaClass } from '../entities/packages.schema';
import { PackagesRepository } from '../../packages.repository';
import { Packages } from '../../../../domain/packages';
import { PackagesMapper } from '../mappers/packages.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PackagesDocumentRepository implements PackagesRepository {
  constructor(
    @InjectModel(PackagesSchemaClass.name)
    private readonly packagesModel: Model<PackagesSchemaClass>,
  ) {}

  async create(data: Packages): Promise<Packages> {
    const persistenceModel = PackagesMapper.toPersistence(data);
    const createdEntity = new this.packagesModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return PackagesMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Packages[]> {
    const entityObjects = await this.packagesModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PackagesMapper.toDomain(entityObject),
    );
  }

  async findById(id: Packages['id']): Promise<NullableType<Packages>> {
    const entityObject = await this.packagesModel.findById(id);
    return entityObject ? PackagesMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Packages['id'][]): Promise<Packages[]> {
    const entityObjects = await this.packagesModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      PackagesMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Packages['id'],
    payload: Partial<Packages>,
  ): Promise<NullableType<Packages>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.packagesModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.packagesModel.findOneAndUpdate(
      filter,
      PackagesMapper.toPersistence({
        ...PackagesMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? PackagesMapper.toDomain(entityObject) : null;
  }

  async remove(id: Packages['id']): Promise<void> {
    await this.packagesModel.deleteOne({ _id: id });
  }
}
