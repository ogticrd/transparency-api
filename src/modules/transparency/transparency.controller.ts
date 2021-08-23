import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';

import { TransparencyPagination, QueryTransparencyDto } from './dto';
import { TransformInterceptor } from '@common/interceptors';
import { TransparencyService } from './transparency.service';
import { ExceptionResponseDto } from '@common/dto';

@Controller({
  version: '1',
  path: 'transparency',
})
@ApiTags('Transparency')
export class TransparencyController {
  constructor(private readonly transparencyService: TransparencyService) {}

  @Get()
  @UseInterceptors(new TransformInterceptor(TransparencyPagination))
  @ApiOkResponse({ type: TransparencyPagination })
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiBadRequestResponse({ type: ExceptionResponseDto })
  getTransparency(@Query() query: QueryTransparencyDto) {
    return this.transparencyService.getData(query);
  }
}
