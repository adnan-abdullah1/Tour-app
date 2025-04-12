import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseModule } from 'src/firebase/firebase/firebase.module';
import { DepartureEntity } from './entities/departure.entity';
import { PackageEntity } from './entities/package.entity';
import { MediaController } from './media/media.controller';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PackageEntity, DepartureEntity]),
    FirebaseModule,
  ],
  controllers: [PackageController, MediaController],
  providers: [PackageService],
  exports: [PackageService],
})
export class PackageModule {}
