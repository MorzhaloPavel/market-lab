import { IsString } from 'class-validator';

export class CreateOneClickLinkDto {
  @IsString()
  saveString: string;
}
