import { OffersService } from './offers.service';
import { User } from '../users/entities/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    getAllOffers(): Promise<import("./entities/offer.entity").Offer[]>;
    getOfferById(id: number): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            about: string;
            avatar: string;
            email: string;
            wishes: import("../wishes/entities/wish.entity").Wish[];
            offers: import("./entities/offer.entity").Offer[];
            wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        hidden: boolean;
        item: import("../wishes/entities/wish.entity").Wish;
    }>;
    createOffer(createOfferDto: CreateOfferDto, { user }: {
        user: User;
    }): Promise<import("./entities/offer.entity").Offer>;
}
