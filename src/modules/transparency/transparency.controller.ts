import { EnvelopInterceptor, TransformInterceptor } from '@common/interceptors';
import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryTransparencyDto, ResponseTransparencyDto } from './dto';

import { TransparencyService } from './transparency.service';

@Controller({
  version: '1',
  path: 'transparency',
})
@ApiTags('Transparency')
@UseInterceptors(EnvelopInterceptor)
export class TransparencyController {
  constructor(private readonly transparencyService: TransparencyService) {}

  @Get('query')
  @UseInterceptors(new TransformInterceptor(ResponseTransparencyDto))
  getTransparency(@Query() query: QueryTransparencyDto) {
    return this.transparencyService.getData(query);
  }
}
