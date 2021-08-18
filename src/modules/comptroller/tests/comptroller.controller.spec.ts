import { Test, TestingModule } from '@nestjs/testing';
import { ComptrollerController } from '../comptroller.controller';

describe('ComptrollerController', () => {
  let controller: ComptrollerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComptrollerController],
    }).compile();

    controller = module.get<ComptrollerController>(ComptrollerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
