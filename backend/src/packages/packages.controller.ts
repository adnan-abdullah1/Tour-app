import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackagesDto } from './dto/create-packages.dto';
import { UpdatePackagesDto } from './dto/update-packages.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Packages } from './domain/packages';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllPackagesDto } from './dto/find-all-packages.dto';

@ApiTags('Packages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'packages',
  version: '1',
})
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Packages,
  })
  create(@Body() createPackagesDto: CreatePackagesDto) {
    return this.packagesService.create(createPackagesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Packages),
  })
  async findAll(
    @Query() query: FindAllPackagesDto,
  ): Promise<InfinityPaginationResponseDto<Packages>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.packagesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Packages,
  })
  findById(@Param('id') id: string) {
    return this.packagesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Packages,
  })
  update(
    @Param('id') id: string,
    @Body() updatePackagesDto: UpdatePackagesDto,
  ) {
    return this.packagesService.update(id, updatePackagesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.packagesService.remove(id);
  }
}
