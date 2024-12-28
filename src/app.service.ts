import { Injectable } from '@nestjs/common';
import { NewMessageCreatedDTO } from './createMessage.dto';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  healthcheck(): { status: string } {
    return { status: 'Running!' };
  }

  async newMessageCreated(messageBody: NewMessageCreatedDTO) {
    try {
      await this.prismaService.message.create({ data: messageBody });

      return {
        statusCode: 200,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
    }
  }
}
