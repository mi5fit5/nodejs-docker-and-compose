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
import { WishlistsService } from './wishlists.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@UseGuards(JwtAuthGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get() // Получение всех виш-листов
  async getAllWishlists() {
    return await this.wishlistsService.findAllWishlists();
  }

  @Post() // Создание нового виш-листа
  async createWishlist(
    @Req() { user }: { user: User },
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    return await this.wishlistsService.createWishlist(createWishlistDto, user);
  }

  @Get(':id') // Получение одного виш-листа
  async getWishlistById(@Param('id') id: number) {
    return this.wishlistsService.findWishlistById(id);
  }

  @Patch(':id') // Обновление виш-листа
  async updateWishlist(
    @Req() { user }: { user: User },
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return await this.wishlistsService.updateWishlist(
      id,
      user.id,
      updateWishlistDto,
    );
  }

  @Delete(':id') // Удаление виш-листа
  async deleteWishlist(
    @Req() { user }: { user: User },
    @Param('id') id: number,
  ) {
    return await this.wishlistsService.deleteWishlistById(id, user.id);
  }
}
