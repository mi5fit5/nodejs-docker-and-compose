import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { WishesService } from '../wishes/wishes.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from '../users/entities/user.entity';
export declare class OffersService {
    private readonly offerRepository;
    private readonly wishesService;
    constructor(offerRepository: Repository<Offer>, wishesService: WishesService);
    createOffer(createOfferDto: CreateOfferDto, user: User): Promise<Offer>;
    findAllOffers(): Promise<Offer[]>;
    findOfferById(offerId: number): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            about: string;
            avatar: string;
            email: string;
            wishes: import("../wishes/entities/wish.entity").Wish[];
            offers: Offer[];
            wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        hidden: boolean;
        item: import("../wishes/entities/wish.entity").Wish;
    }>;
}
