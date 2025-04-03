import {
  // common
  Module,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { DocumentPackagesPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentPackagesPersistenceModule,
  ],
  controllers: [PackagesController],
  providers: [PackagesService],
  exports: [PackagesService, DocumentPackagesPersistenceModule],
})
export class PackagesModule {}
