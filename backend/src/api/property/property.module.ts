import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from './entities/property.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
  imports: [TypeOrmModule.forFeature([PropertyEntity])],
})
export class PropertyModule {}
