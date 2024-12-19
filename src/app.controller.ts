import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { newMessageCreatedDTO } from './createMessage.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthz')
  healthcheck(): { status: string } {
    return this.appService.healthcheck();
  }

  @Post()
  newMessageSent(@Body() createNewMessageDTO: newMessageCreatedDTO) {
    return this.appService.newMessageCreated(createNewMessageDTO);
  }
}
