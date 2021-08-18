import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import jwt_decode from 'jwt-decode';

import { Token } from './entities';
import { QueryTransparencyDto } from './dto';

@Injectable()
export class TransparencyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Token)
    private readonly tokenRepo: Repository<Token>,
  ) {}

  async getData(params: QueryTransparencyDto) {
    const token = await this.getActiveToken();
    let date = this.getLastPayrollDate();

    if (params.date) {
      date = this.formatDate(params.date);
    }

    delete params.date;

    return new Promise((res, rej) => {
      this.httpService
        .get('/api/empleados/' + date, {
          params: {
            nombre: params.name,
            apellido: params.lastname,
            genero: params.gender,
            institucion: params.institution,
            cargo: params.position,
            lugar: params.place,
            estatus: params.contractType,
            page: params.page,
          },
          headers: {
            authorization: 'Bearer ' + token,
          },
        })
        .subscribe({
          next: async ({ data }) => {
            return res(data.data);
          },
          error: (err) => {
            throw new BadRequestException(err.message);
          },
        });
    });
  }

  private async getJwtToken(): Promise<string> {
    const email = this.configService.get('TRANSPARENCY_API_TOKEN_EMAIL');

    return new Promise((res, rej) => {
      this.httpService
        .post('/api/login', null, { params: { email } })
        .subscribe({
          next: async ({ data }) => {
            if (data.success) {
              return res(data.success.token);
            }
          },
          error: (err) => {
            throw new BadRequestException(err.message);
          },
        });
    });
  }

  private async saveToken(token: string) {
    const expirationDate = this.getTokenExpirationDate(token);

    const createdToken = this.tokenRepo.create({
      token,
      expirationDate,
      isActive: true,
    });

    await this.tokenRepo.save(createdToken);
  }

  private async getActiveToken() {
    const { token, expirationDate } = await this.tokenRepo.findOne({
      where: { isActive: true },
      order: { id: 'DESC' },
    });

    if (!(expirationDate >= new Date())) {
      const newToken = await this.getJwtToken();
      await this.saveToken(newToken);

      return newToken;
    }

    return token;
  }

  private getTokenExpirationDate(token: string) {
    var decoded: any = jwt_decode(token);

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  private formatDate(date: Date) {
    return (
      date.getFullYear().toString() +
      (date.getMonth() < 10
        ? '0' + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString()) +
      '01'
    );
  }

  private getLastPayrollDate() {
    const currentDate = new Date();

    return (
      currentDate.getFullYear().toString() +
      (currentDate.getMonth() < 10
        ? '0' + currentDate.getMonth().toString()
        : currentDate.getMonth().toString()) +
      '01'
    );
  }
}
