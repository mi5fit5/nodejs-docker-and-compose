import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { User } from '../users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';
export declare class WishesController {
    private readonly wishesService;
    constructor(wishesService: WishesService);
    createWish({ user }: {
        user: User;
    }, createWishDto: CreateWishDto): Promise<{
        owner: User;
        name: string;
        link: string;
        image: string;
        price: number;
        description: string;
    } & import("./entities/wish.entity").Wish>;
    getLastWishes(): Promise<import("./entities/wish.entity").Wish[]>;
    getTopWishes(): Promise<import("./entities/wish.entity").Wish[]>;
    findWishById(id: number): Promise<import("./entities/wish.entity").Wish>;
    updateWish({ user }: {
        user: User;
    }, id: number, updateWishDto: UpdateWishDto): Promise<import("typeorm").UpdateResult>;
    removeWishById({ user }: {
        user: User;
    }, id: number): Promise<import("./entities/wish.entity").Wish>;
    copyWish({ user }: {
        user: User;
    }, id: number): Promise<void>;
}
