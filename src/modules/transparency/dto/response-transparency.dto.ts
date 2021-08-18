import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class ResponseTransparencyDto {
  @Expose()
  @IsNumber()
  id: number;

  @IsString()
  @Expose({ name: 'NOMBRES' })
  names: string;

  @IsString()
  @Expose({ name: 'APELLIDOS' })
  lastnames: string;

  @IsString()
  @Expose({ name: 'INSTITUCION' })
  institution: string;

  @IsString()
  @Expose({ name: 'CARGO' })
  position: string;

  @IsString()
  @Expose({ name: 'LUGAR_FUNCIONES' })
  place: string;

  @IsString()
  @Expose({ name: 'GENERO' })
  genre: string;

  @IsString()
  @Expose({ name: 'TIPO_EMPLEADO' })
  employeeType: string;

  @IsString()
  @Expose({ name: 'SUELDO_BRUTO_FIJOS' })
  grossSalary: string;
}
