import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { WishesService } from '../wishes/wishes.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  // Создание нового предложения
  async createOffer(createOfferDto: CreateOfferDto, user: User) {
    const { itemId, amount } = createOfferDto;
    const wish = await this.wishesService.findWishById(itemId);

    if (!wish) {
      throw new NotFoundException('Пожелание не найдено');
    }

    if (wish.owner.id === user.id) {
      throw new BadRequestException(
        'Вы не можете поддержать собственное пожелание',
      );
    }

    const totalRaised = +wish.raised + +amount;

    if (totalRaised > +wish.price) {
      throw new BadRequestException(
        'Вы не можете предложить сумму, превышающую общую стоимость пожелания',
      );
    }

    await this.wishesService.updateRaisedAmount(wish.id, totalRaised);

    const createdOffer = await this.offerRepository.create({
      ...createOfferDto,
      user,
      item: wish,
    });

    const savedOffer = await this.offerRepository.save(createdOffer);

    return savedOffer;
  }

  // Получение всех предложений
  async findAllOffers() {
    const offers = await this.offerRepository.find({
      relations: ['item', 'user'],
    });

    return offers;
  }

  // Получение одного предложения
  async findOfferById(offerId: number) {
    const offer = await this.offerRepository.findOne({
      where: { id: offerId },
      relations: ['item', 'user'],
    });

    if (!offer) {
      throw new NotFoundException('Предложение не найдено');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = offer.user;
    return { ...offer, user: result };
  }
}
