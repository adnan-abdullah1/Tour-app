import { StringField } from '@/decorators/field.decorators';
import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreatePropertyDto {
  @StringField()
  @Transform(lowerCaseTransformer)
  name!: string;

  @IsOptional()
  @StringField()
  description?: string;

  @StringField()
  address!: string;

  @StringField()
  @Transform(lowerCaseTransformer)
  propertyClass!: string; // e.g., "4-star", "5-star"
}
