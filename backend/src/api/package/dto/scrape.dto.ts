import { ApiProperty } from '@nestjs/swagger';

export class ScrapPackageDto {
  @ApiProperty({
    type: String,
    example: 'https://example.com/himachal-tour',
    description: 'URL to scrape the package data from',
  })
  url: string;
}
