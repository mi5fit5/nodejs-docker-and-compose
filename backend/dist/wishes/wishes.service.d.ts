import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { User } from '../users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';
export declare class WishesService {
    private readonly wishRepository;
    constructor(wishRepository: Repository<Wish>);
    createWish(createWishDto: CreateWishDto, user: User): Promise<{
        owner: User;
        name: string;
        link: string;
        image: string;
        price: number;
        description: string;
    } & Wish>;
    findLastWishes(): Promise<Wish[]>;
    findTopWishes(): Promise<Wish[]>;
    findWishById(id: number): Promise<Wish>;
    updateWish(wishId: number, userId: number, updateWishDto: UpdateWishDto): Promise<import("typeorm").UpdateResult>;
    removeWishById(wishId: number, userId: number): Promise<Wish>;
    copyWish(wishId: number, user: User): Promise<void>;
    findManyByIds(wishIds: number[]): Promise<Wish[]>;
    updateRaisedAmount(wishId: number, raised: number): Promise<void>;
}
