import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { WishesService } from '../wishes/wishes.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from '../users/entities/user.entity';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
  ) {}

  // Создание нового виш-листа
  async createWishlist(createWishlistDto: CreateWishlistDto, user: User) {
    const wishes = await this.wishesService.findManyByIds(
      createWishlistDto.itemsId,
    );
    const wishlist = await this.wishlistRepository.save({
      ...createWishlistDto,
      owner: user,
      items: wishes,
    });

    return await this.wishlistRepository.findOne({
      where: { id: wishlist.id },
      relations: ['owner', 'items'],
    });
  }

  // Получение всех виш-листов
  async findAllWishlists() {
    const wishlists = await this.wishlistRepository.find({
      relations: ['owner', 'items'],
    });

    return wishlists;
  }

  // Получение одного виш-листа
  async findWishlistById(wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: wishlistId },
      relations: ['owner', 'items'],
    });

    if (!wishlist) {
      throw new NotFoundException('Виш-лист не найден');
    }

    return wishlist;
  }

  // Обновление виш-листа
  async updateWishlist(
    wishlistId: number,
    userId: number,
    updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.findWishlistById(wishlistId);

    if (!wishlist) {
      throw new NotFoundException('Виш-лист не найден');
    }

    if (wishlist.owner.id !== userId) {
      throw new BadRequestException(
        'Вы не являетесь владельцем данного виш-листа',
      );
    }

    const { name, image, description, itemsId = [] } = updateWishlistDto;
    const wishes = await this.wishesService.findManyByIds(itemsId);

    return await this.wishlistRepository.save({
      ...wishlist,
      name,
      image,
      description,
      items: wishes,
    });
  }

  async deleteWishlistById(wishlistId: number, userId: number) {
    const wishlist = await this.findWishlistById(wishlistId);

    if (!wishlist) {
      throw new NotFoundException('Виш-лист не найден');
    }

    if (wishlist.owner.id !== userId) {
      throw new BadRequestException(
        'Вы не являетесь владельцем данного виш-листа',
      );
    }

    await this.wishlistRepository.delete(wishlistId);

    return wishlist;
  }
}
