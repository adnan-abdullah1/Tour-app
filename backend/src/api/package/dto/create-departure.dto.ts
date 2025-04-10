import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateDepartureDto {
  @ApiProperty({
    example: '2025-12-01T09:00:00.000Z',
    description: 'Start date and time of the departure (ISO string)',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate!: string;

  @ApiProperty({
    example: '2025-12-07T17:00:00.000Z',
    description: 'End date and time of the departure (ISO string)',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate!: string;

  @ApiProperty({
    example: 12999.99,
    description: 'Price of the package departure',
  })
  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @ApiProperty({
    example: '0593349e-a116-4cad-aad9-beeaeb6a98b3',
    description: 'UUID of the associated package',
  })
  @IsUUID()
  @IsNotEmpty()
  packageId!: string;
}
