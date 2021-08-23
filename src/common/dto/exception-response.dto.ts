import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

@Exclude()
export class ExceptionResponseDto {
  @Expose()
  @ApiProperty({ default: false })
  @IsBoolean()
  valid: boolean = false;

  @Expose()
  @ApiProperty()
  @IsString()
  message: string;
}
