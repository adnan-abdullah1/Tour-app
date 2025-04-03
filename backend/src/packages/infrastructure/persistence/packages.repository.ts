import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Packages } from '../../domain/packages';

export abstract class PackagesRepository {
  abstract create(
    data: Omit<Packages, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Packages>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Packages[]>;

  abstract findById(id: Packages['id']): Promise<NullableType<Packages>>;

  abstract findByIds(ids: Packages['id'][]): Promise<Packages[]>;

  abstract update(
    id: Packages['id'],
    payload: DeepPartial<Packages>,
  ): Promise<Packages | null>;

  abstract remove(id: Packages['id']): Promise<void>;
}
