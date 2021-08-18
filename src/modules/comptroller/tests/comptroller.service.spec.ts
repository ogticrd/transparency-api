import { Test, TestingModule } from '@nestjs/testing';
import { ComptrollerService } from '../comptroller.service';

describe('ComptrollerService', () => {
  let service: ComptrollerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComptrollerService],
    }).compile();

    service = module.get<ComptrollerService>(ComptrollerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
