import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PackagesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
