import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import jwt_decode from 'jwt-decode';

import { QueryTransparencyDto } from './dto';
import { Token } from './entities';

@Injectable()
export class TransparencyService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepo: Repository<Token>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getData(params: QueryTransparencyDto) {
    const token = await this.getActiveToken();
    const authorization = 'Bearer ' + token;
    let date = this.getLastPayrollDate();

    if (params.date) {
      date = this.formatDate(params.date);
    }

    return new Promise((res, rej) => {
      delete params.date;

      this.httpService
        .get('/api/empleados/' + date, {
          params: {
            nombre: params.name,
            apellido: params.lastName,
            genero: params.gender,
            institucion: params.institution,
            cargo: params.position,
            lugar: params.place,
            estatus: params.contractType,
            page: params.page,
          },
          headers: {
            authorization,
          },
        })
        .subscribe({
          next: ({ data: { data, meta } }) => {
            const response = {
              valid: true,
              data,
              meta: {
                total: meta.total,
                currentPage: meta.current_page,
                lastPage: meta.last_page,
              },
            };

            return res(response);
          },
          error: (err) => {
            const status = (err.response && err.response.status) || 500;

            rej(
              new HttpException({ valid: false, message: err.message }, status),
            );
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
          next: ({ data }) => {
            if (data.success) {
              return res(data.success.token);
            }
          },
          error: (err) => {
            throw new BadRequestException({
              valid: false,
              message: err.message,
            });
          },
        });
    });
  }

  private async saveToken(token: string): Promise<void> {
    const expirationDate = this.getTokenExpirationDate(token);

    const createdToken = this.tokenRepo.create({
      token,
      expirationDate,
      isActive: true,
    });

    await this.tokenRepo.save(createdToken);
  }

  private async getActiveToken(): Promise<string> {
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

  private getTokenExpirationDate(token: string): Date {
    var decoded: any = jwt_decode(token);

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  private formatDate(date: Date): string {
    return (
      date.getFullYear().toString() +
      (date.getMonth() < 10
        ? '0' + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString()) +
      '01'
    );
  }

  private getLastPayrollDate(): string {
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
