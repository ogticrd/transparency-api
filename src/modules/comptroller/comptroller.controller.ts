import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ComptrollerService } from './comptroller.service';

@Controller({
  version: '1',
  path: 'comptroller',
})
@ApiTags('Comptroller')
export class ComptrollerController {
  constructor(private readonly comptrollerService: ComptrollerService) {}

  @Get('query/:cedula')
  getData(@Param('cedula') cedula: number) {
    return this.comptrollerService.getData(cedula);
  }
}
