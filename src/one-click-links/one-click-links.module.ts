import { Module } from '@nestjs/common';
import { OneClickLinksController } from './one-click-links.controller';
import { OneClickLinksService } from './one-click-links.service';
import { OneClickLinksEntity } from './entities/one-click-links.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OneClickLinksEntity])],
  controllers: [OneClickLinksController],
  providers: [OneClickLinksService],
})
export class OneClickLinksModule {}
