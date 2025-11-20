import { WishlistsService } from './wishlists.service';
import { User } from '../users/entities/user.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    getAllWishlists(): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    createWishlist({ user }: {
        user: User;
    }, createWishlistDto: CreateWishlistDto): Promise<import("./entities/wishlist.entity").Wishlist>;
    getWishlistById(id: number): Promise<import("./entities/wishlist.entity").Wishlist>;
    updateWishlist({ user }: {
        user: User;
    }, id: number, updateWishlistDto: UpdateWishlistDto): Promise<{
        name: string;
        image: string;
        description: string;
        items: import("../wishes/entities/wish.entity").Wish[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
        owner: User;
    } & import("./entities/wishlist.entity").Wishlist>;
    deleteWishlist({ user }: {
        user: User;
    }, id: number): Promise<import("./entities/wishlist.entity").Wishlist>;
}
