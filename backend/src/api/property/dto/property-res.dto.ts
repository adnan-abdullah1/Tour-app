import { ApiProperty } from '@nestjs/swagger';

export class PropertyResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id!: string;

  @ApiProperty({ example: 'Hotel Taj' })
  name!: string;

  @ApiProperty({ example: 'Located at Dal lake' })
  description?: string;

  @ApiProperty({ example: 'Srinagar Dal lake' })
  address!: string;

  @ApiProperty({ example: '4-star' })
  propertyClass!: string; // e.g., "4-star", "5-star"

  @ApiProperty({
    example: [
      { type: 'image', url: 'http://example.com/image1.jpg' },
      { type: 'video', url: 'http://example.com/video1.mp4' },
    ],
    description: 'Array of media objects, each containing a type and a URL',
  })
  media?: Array<{ type: 'video' | 'image'; url: string }>;

  @ApiProperty({ example: '2023-10-01T12:34:56Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2023-10-01T12:34:56Z' })
  updatedAt!: Date;
}
