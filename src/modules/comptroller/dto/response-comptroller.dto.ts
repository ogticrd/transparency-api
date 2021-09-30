import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';

class ResponseConptroller {
  cedula: string;
  name: string;
  employer: string;
  institution: string;
  salary: string;
  account: string;
}

@Exclude()
export class ResponseComptrollerDto {
  @Expose()
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  valid: boolean;

  @Expose()
  @Type(() => ResponseConptroller)
  @ApiProperty({ type: ResponseConptroller })
  data: ResponseConptroller;
}
