// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePackagesDto } from './create-packages.dto';

export class UpdatePackagesDto extends PartialType(CreatePackagesDto) {}
