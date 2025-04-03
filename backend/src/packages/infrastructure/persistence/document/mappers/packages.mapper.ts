import { Packages } from '../../../../domain/packages';
import { PackagesSchemaClass } from '../entities/packages.schema';

export class PackagesMapper {
  public static toDomain(raw: PackagesSchemaClass): Packages {
    const domainEntity = new Packages();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Packages): PackagesSchemaClass {
    const persistenceSchema = new PackagesSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
