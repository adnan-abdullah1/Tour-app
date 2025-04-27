import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PackageModule } from '../package/package.module';
import { AffiliateSchema } from './entities/affilates.entity';
import { IngestController } from './ingest.controller';
import { IngestService } from './ingest.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Affiliate', schema: AffiliateSchema }]),
    PackageModule,
  ],
  controllers: [IngestController],
  providers: [IngestService],
  exports: [IngestService],
})
export class IngestModule {}
