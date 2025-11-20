import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { User } from '../users/entities/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get() // Получение всех предложений
  async getAllOffers() {
    return this.offersService.findAllOffers();
  }

  @Get(':id') // Получение одного предложения
  async getOfferById(@Param('id') id: number) {
    return await this.offersService.findOfferById(id);
  }

  @Post() // Создание нового предложения
  async createOffer(
    @Body() createOfferDto: CreateOfferDto,
    @Req() { user }: { user: User },
  ) {
    return await this.offersService.createOffer(createOfferDto, user);
  }
}
