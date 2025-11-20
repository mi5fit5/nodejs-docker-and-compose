import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { WishesService } from '../wishes/wishes.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from '../users/entities/user.entity';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
export declare class WishlistsService {
    private readonly wishlistRepository;
    private readonly wishesService;
    constructor(wishlistRepository: Repository<Wishlist>, wishesService: WishesService);
    createWishlist(createWishlistDto: CreateWishlistDto, user: User): Promise<Wishlist>;
    findAllWishlists(): Promise<Wishlist[]>;
    findWishlistById(wishlistId: number): Promise<Wishlist>;
    updateWishlist(wishlistId: number, userId: number, updateWishlistDto: UpdateWishlistDto): Promise<{
        name: string;
        image: string;
        description: string;
        items: import("../wishes/entities/wish.entity").Wish[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
        owner: User;
    } & Wishlist>;
    deleteWishlistById(wishlistId: number, userId: number): Promise<Wishlist>;
}
