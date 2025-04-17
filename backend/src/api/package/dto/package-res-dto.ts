
import { StringField } from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';


export class PackageResponseDto {
  @StringField()
  id!: ObjectId;

  @StringField()
  name!: string;

  @ApiProperty({ type: String })
  location: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String, format: 'uri' })
  redirectUrl: string;

  @ApiProperty({ type: String, format: 'date-time' })
  startDate: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  endDate: Date;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: String, required: false })
  inclusions?: string;

  @ApiProperty({ type: String, required: false })
  exclusions?: string;

  @ApiProperty({ type: Number, required: false })
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
  daysPlan?: Array<{ day: number; plan: string; description: string }>;

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
  highlights?: Array<{ icon: string; description: string }>;
}
