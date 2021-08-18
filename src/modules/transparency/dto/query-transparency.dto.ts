import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum Gender {
  MASCULINO = 'MASCULINO',
  FEMENINO = 'FEMENINO',
}

enum ContractType {
  CONTRATADO = 'CONTRATADO',
  CONTRATADO_CON_SEGURIDA_SOCIAL = 'CONTRATADO CON SEGURIDA SOCIAL',
  CONTRATADO_EN_PRUEBA = 'CONTRATADO EN PRUEBA',
  CONTRATADO_EN_SERVICIOS = 'CONTRATADO EN SERVICIOS',
  CONTRATADO_SERVICIOS_DIVERSOS = 'CONTRATADO SERVICIOS DIVERSOS',
  CONTRATADO_SIN_SEGURIDA_SOCIAL = 'CONTRATADO SIN SEGURIDA SOCIAL',
  CONTRATADO_Y_O_IGUALADO = 'CONTRATADO Y/O IGUALADO',
  CONTRATADOS_10_PORCIENTO = 'CONTRATADOS 10%',
  CONTRATADOS_CARGOS_DE_CARRERA = 'CONTRATADOS CARGOS DE CARRERA',
  CONTRATADOS_PREPARA = 'CONTRATADOS PREPARA',
  CONTRATADOS_TEMPOREROS = 'CONTRATADOS TEMPOREROS',
  HONORARIOS_PROFESIONALES = 'HONORARIOS PROFESIONALES',
  JORNALES = 'JORNALES',
  JORNALES_CON_SEGURIDAD_SOCIAL = 'JORNALES CON SEGURIDAD SOCIAL',
  MILITAR_FIJO = 'MILITAR FIJO',
  NOMINAL = 'NOMINAL',
  NOMINAL_PERIODO_DE_PRUEBA = 'NOMINAL PERIODO DE PRUEBA',
  PASANTE = 'PASANTE',
  PERSONAL_DE_CARACTER_EVENTUAL = 'PERSONAL DE CARACTER EVENTUAL',
  PERSONAL_DE_VIGILANCIA = 'PERSONAL DE VIGILANCIA',
  PERSONAL_DOCENTE = 'PERSONAL DOCENTE',
  PERSONAL_MILITAR_TECNICO = 'PERSONAL MILITAR (TECNICO)',
  SERVICIOS_ESPECIALES = 'SERVICIOS ESPECIALES',
  TRAMITE_DE_PENSION = 'TRAMITE DE PENSION',
}

export class QueryTransparencyDto {
  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  date: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  page: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  lastname: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  institution: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  position: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  place: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty({ required: false, enum: Gender })
  gender: Gender;

  @IsOptional()
  @IsEnum(ContractType)
  @ApiProperty({ required: false, enum: ContractType })
  contractType: ContractType;
}
