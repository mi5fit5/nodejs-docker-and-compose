import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtAuthGuard)
  @Post() // Создание нового пожелания
  async createWish(
    @Req() { user }: { user: User },
    @Body() createWishDto: CreateWishDto,
  ) {
    return await this.wishesService.createWish(createWishDto, user);
  }

  @Get('last') // Получение последних 40 пожеланий
  async getLastWishes() {
    return await this.wishesService.findLastWishes();
  }

  @Get('top') // Получение топ-20 пожеланий по кол-ву копирований
  async getTopWishes() {
    return await this.wishesService.findTopWishes();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id') // Получение конкретного пожелания
  async findWishById(@Param('id') id: number) {
    return await this.wishesService.findWishById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id') // Обновление собственного пожелания
  async updateWish(
    @Req() { user }: { user: User },
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return await this.wishesService.updateWish(id, user.id, updateWishDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id') // Удаление собственного пожелания
  async removeWishById(
    @Req() { user }: { user: User },
    @Param('id') id: number,
  ) {
    return await this.wishesService.removeWishById(id, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy') // Копирование пожелания
  async copyWish(@Req() { user }: { user: User }, @Param('id') id: number) {
    return await this.wishesService.copyWish(id, user);
  }
}
