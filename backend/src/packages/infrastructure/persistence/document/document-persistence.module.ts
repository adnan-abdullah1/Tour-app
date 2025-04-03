import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PackagesSchema,
  PackagesSchemaClass,
} from './entities/packages.schema';
import { PackagesRepository } from '../packages.repository';
import { PackagesDocumentRepository } from './repositories/packages.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PackagesSchemaClass.name, schema: PackagesSchema },
    ]),
  ],
  providers: [
    {
      provide: PackagesRepository,
      useClass: PackagesDocumentRepository,
    },
  ],
  exports: [PackagesRepository],
})
export class DocumentPackagesPersistenceModule {}
