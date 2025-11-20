import { JwtService } from '@nestjs/jwt';
import { HashService } from '../hash/hash.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly hashService;
    private readonly jwtService;
    constructor(usersService: UsersService, hashService: HashService, jwtService: JwtService);
    getJwtTokenForUser(user: User): Promise<{
        access_token: string;
    }>;
    validateUserPassword(username: string, userPassword: string): Promise<{
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
}
