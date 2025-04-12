import { StringField } from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ example: 'cover photo', required: false })
  @IsOptional()
  @StringField()
  label?: string;
}
