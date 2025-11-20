import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getOwnUser({ user }: {
        user: User;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        about: string;
        avatar: string;
        email: string;
        wishes: import("../wishes/entities/wish.entity").Wish[];
        offers: import("../offers/entities/offer.entity").Offer[];
        wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
    }>;
    updateOwnProfile({ user }: {
        user: User;
    }, updateUserDto: UpdateUserDto): Promise<User>;
    findUsers(findUserDto: FindUserDto): Promise<User[]>;
    getUserByUsername(username: string): Promise<User>;
    getOwnWishes({ user }: {
        user: User;
    }): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    getWishesByUsername(username: string): Promise<import("../wishes/entities/wish.entity").Wish[]>;
}
