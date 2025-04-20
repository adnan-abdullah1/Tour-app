import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from 'src/firebase/firebase/firebase.module';
import { PackageSchema } from './entities/package.schema';
import { MediaController } from './media/media.controller';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { ScraperService } from './scraper.service';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([{ name: 'Package', schema: PackageSchema }]),
  ],
  controllers: [PackageController, MediaController],
  providers: [PackageService, ScraperService],
  exports: [PackageService],
})
export class PackageModule {}
