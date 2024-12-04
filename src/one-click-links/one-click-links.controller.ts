import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OneClickLinksService } from './one-click-links.service';
import { CreateOneClickLinkDto } from './dto/create-one-click-link.dto';

@Controller('one-click-links')
export class OneClickLinksController {
  constructor(private readonly service: OneClickLinksService) {}

  @Post()
  create(@Body() { saveString }: CreateOneClickLinkDto): Promise<string> {
    return this.service.create(saveString);
  }

  @Get(':hash')
  getSaveString(@Param('hash') hash: string): Promise<string> {
    return this.service.getSaveString(hash);
  }
}
