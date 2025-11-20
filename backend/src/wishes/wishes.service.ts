import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { In, Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { User } from '../users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  // Создание нового пожелания
  async createWish(createWishDto: CreateWishDto, user: User) {
    const wish = await this.wishRepository.save({
      ...createWishDto,
      owner: user,
    });

    return wish;
  }

  // Получение последних 40 пожеланий
  async findLastWishes() {
    const wishes = await this.wishRepository.find({
      order: { createdAt: 'desc' },
      take: 40,
      relations: ['owner', 'offers', 'offers.user'],
    });

    return wishes;
  }

  // Получение топ-20 пожеланий
  async findTopWishes() {
    const wishes = await this.wishRepository.find({
      order: { copied: 'desc' },
      take: 20,
      relations: ['owner', 'offers', 'offers.user'],
    });

    return wishes;
  }

  // Получение одного пожелания
  async findWishById(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner', 'offers', 'offers.user'],
    });

    if (!wish) {
      throw new NotFoundException('Пожелание не найдено');
    }

    return wish;
  }

  // Обновление пожелания
  async updateWish(
    wishId: number,
    userId: number,
    updateWishDto: UpdateWishDto,
  ) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: ['owner'],
    });

    if (!wish) {
      throw new NotFoundException('Пожелание не найдено');
    }

    if (wish.raised > 0) {
      throw new BadRequestException('Нельзя изменить стоимость');
    }

    if (wish.owner.id !== userId) {
      throw new BadRequestException(
        'Вы не являетесь владельцем этого пожелания',
      );
    }

    const updatedWish = await this.wishRepository.update(wishId, updateWishDto);

    return updatedWish;
  }

  // Удаление пожелания
  async removeWishById(wishId: number, userId: number) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: ['owner'],
    });

    if (!wish) {
      throw new NotFoundException('Пожелание не найдено');
    }

    if (wish.owner.id !== userId) {
      throw new BadRequestException(
        'Вы не являетесь владельцем этого пожелания',
      );
    }

    await this.wishRepository.delete(wishId);

    return wish;
  }

  async copyWish(wishId: number, user: User) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: ['owner'],
    });

    if (!wish) {
      throw new NotFoundException('Пожелание не найдено');
    }

    this.wishRepository.update(wishId, { copied: wish.copied + 1 });

    delete wish.id;
    delete wish.createdAt;
    delete wish.updatedAt;

    const wishCopy = { ...wish, owner: user, copied: 0, raised: 0, offers: [] };

    await this.createWish(wishCopy, user);
  }

  // Получение нескольких пожеланий
  async findManyByIds(wishIds: number[]) {
    const wishes = await this.wishRepository.find({
      where: { id: In(wishIds) },
    });

    return wishes;
  }

  // Обновление суммы, собранной на пожелание
  async updateRaisedAmount(wishId: number, raised: number) {
    await this.wishRepository.update(wishId, { raised });
  }
}
