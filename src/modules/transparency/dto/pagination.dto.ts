import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';

import { ResponseTransparencyDto } from './response-transparency.dto';

class PaginationMetadata {
  total: number;
  currentPage: number;
  lastPage: number;
}

@Exclude()
export class TransparencyPagination {
  @IsBoolean()
  @Expose()
  @ApiProperty({ type: Boolean })
  valid: boolean;

  @Expose()
  @Type(() => ResponseTransparencyDto)
  @ApiProperty({ type: ResponseTransparencyDto })
  data: ResponseTransparencyDto[];

  @Expose()
  @Type(() => PaginationMetadata)
  @ApiProperty({ type: PaginationMetadata })
  meta: PaginationMetadata;
}
