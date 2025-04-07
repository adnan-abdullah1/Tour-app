import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({ example: 'kashmir trip' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Accommodation on twin sharing basis\nMeals ' })
  @IsOptional()
  @IsString()
  inclusions!: string;

  @ApiProperty({ example: 'Cost of Rail\nHotel tariff charges.' })
  @IsOptional()
  @IsString()
  exclusions!: string;

  @ApiProperty({ example: 'Short Break at shalimar' })
  @IsOptional()
  @IsString()
  highlights!: string;
}
