import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreatePackagesDto } from './dto/create-packages.dto';
import { UpdatePackagesDto } from './dto/update-packages.dto';
import { PackagesRepository } from './infrastructure/persistence/packages.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Packages } from './domain/packages';

@Injectable()
export class PackagesService {
  constructor(
    // Dependencies here
    private readonly packagesRepository: PackagesRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createPackagesDto: CreatePackagesDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.packagesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.packagesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Packages['id']) {
    return this.packagesRepository.findById(id);
  }

  findByIds(ids: Packages['id'][]) {
    return this.packagesRepository.findByIds(ids);
  }

  async update(
    id: Packages['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePackagesDto: UpdatePackagesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.packagesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Packages['id']) {
    return this.packagesRepository.remove(id);
  }
}
