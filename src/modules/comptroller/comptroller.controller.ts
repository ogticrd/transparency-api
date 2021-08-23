import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '@common/interceptors';

import { ComptrollerService } from './comptroller.service';
import { ExceptionResponseDto } from '@common/dto';
import { ResponseComptrollerDto } from './dto';

@Controller({
  version: '1',
  path: 'comptroller',
})
@ApiTags('Comptroller')
export class ComptrollerController {
  constructor(private readonly comptrollerService: ComptrollerService) {}

  @Get(':cedula')
  @UseInterceptors(new TransformInterceptor(ResponseComptrollerDto))
  @ApiOkResponse({ type: ResponseComptrollerDto })
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiBadRequestResponse({ type: ExceptionResponseDto })
  getData(@Param('cedula') cedula: number) {
    return this.comptrollerService.getData(cedula);
  }
}
