import { DateField, StringField } from '@/decorators/field.decorators';
import { IsOptional } from 'class-validator';

export class PackageResponseDto {
  @StringField()
  name!: string;

  @IsOptional()
  @StringField()
  inclusions!: string;

  @IsOptional()
  @StringField()
  exclusions!: string;

  @IsOptional()
  @StringField()
  highlights!: string;

  @IsOptional()
  @DateField()
  startDate: Date;

  @IsOptional()
  @DateField()
  endDate: Date;
}
