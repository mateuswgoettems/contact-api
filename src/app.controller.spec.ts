// app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewMessageCreatedDTO } from './createMessage.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockAppService = {
    healthcheck: jest.fn().mockReturnValue({ status: 'Running!' }),
    newMessageCreated: jest.fn(async () => ({
      statusCode: 200,
      message: 'Success',
    })),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('healthcheck', () => {
    it('Should return status "Running!"', () => {
      const result = appController.healthcheck();
      expect(result).toEqual({ status: 'Running!' });
      expect(appService.healthcheck).toHaveBeenCalled();
    });
  });

  describe('newMessageSent', () => {
    it('Should return a confirmation message when a new message is created', async () => {
      const dto: NewMessageCreatedDTO = {
        sender: 'João Silva',
        email: 'joao.silva@example.com',
        phoneNumber: '1234567890',
        message: 'Hello, this is a text message. Say Hi!',
      };

      const result = await appController.newMessageSent(dto);
      expect(result).toEqual({
        statusCode: 200,
        message: 'Success',
      });
      expect(appService.newMessageCreated).toHaveBeenCalledWith(dto);
    });

    it('Should throw an exception if AppService fail', async () => {
      const dto: NewMessageCreatedDTO = {
        sender: 'Maria Souza',
        email: 'maria.souza@example.com',
        phoneNumber: '0987654321',
        message: 'Teste de erro',
      };

      mockAppService.newMessageCreated.mockImplementationOnce(async () => {
        throw new Error('Error creating message');
      });

      await expect(appController.newMessageSent(dto)).rejects.toThrow(
        'Error creating message',
      );
      expect(appService.newMessageCreated).toHaveBeenCalledWith(dto);
    });
  });
});
