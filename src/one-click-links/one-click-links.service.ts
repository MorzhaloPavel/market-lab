import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OneClickLinksEntity } from './entities/one-click-links.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { generateRandomString } from '../shared/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OneClickLinksService {
  appUrl: string;
  constructor(
    @InjectRepository(OneClickLinksEntity)
    private repository: Repository<OneClickLinksEntity>,
    configService: ConfigService,
  ) {
    this.appUrl = configService.getOrThrow('APP_URL');
  }

  async create(saveString: string): Promise<string> {
    const hash = generateRandomString(10);
    const link = `${this.appUrl}/api/one-click-links/${hash}`;

    try {
      await this.repository.create({ saveString, link, hash }).save();
    } catch (e) {
      throw new BadRequestException('something_went_wrong');
    }

    return link;
  }

  async getSaveString(hash: string): Promise<string> {
    const data = await this.repository.findOneBy({ hash });
    if (!data) throw new NotFoundException();
    if (data.isUsed) throw new BadRequestException();

    data.isUsed = true;
    await data.save();

    return data.saveString;
  }
}
