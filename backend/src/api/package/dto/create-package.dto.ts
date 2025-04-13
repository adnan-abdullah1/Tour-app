import {
  DateField,
  NumberField,
  StringField,
  URLField,
} from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePackageDto {
  @StringField()
  name!: string;

  @StringField()
  location!: string;

  @StringField()
  description!: string;

  @URLField()
  redirectUrl!: string;

  @DateField()
  startDate: Date;

  @DateField()
  endDate: Date;

  @NumberField()
  price: number;

  @IsOptional()
  @StringField()
  inclusions!: string;

  @IsOptional()
  @StringField()
  exclusions!: string;

  @IsOptional()
  @NumberField()
  rating?: number;

  @ApiProperty({
    description: 'Detailed plan for each day',
    example: [{ day: 1, plan: 'Arrival', description: 'Arrive at the hotel' }],
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        day: { type: 'number' },
        plan: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  @IsOptional()
  daysPlan: Array<{ day: number; plan: string; description: string }>;

  @ApiProperty({
    description: 'Package highlights shown with icons and descriptions',
    example: [
      { icon: '🗼', description: 'Visit the Eiffel Tower' },
      { icon: '🌊', description: 'Beach day at the coast' },
    ],
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        icon: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  @IsOptional()
  highlights!: Array<{ icon: string; description: string }>;
}
