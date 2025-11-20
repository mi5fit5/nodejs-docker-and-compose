import { PartialType } from '@nestjs/swagger';
import { CreateWishDto } from './create-wish.dto';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  @IsNumber()
  @IsOptional()
  @Min(0)
  raised: number;
}
