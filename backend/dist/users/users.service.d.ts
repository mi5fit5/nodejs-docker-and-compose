import { HashService } from '../hash/hash.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly hashService;
    constructor(userRepository: Repository<User>, hashService: HashService);
    createNewUser(createUserDto: CreateUserDto): Promise<User>;
    findByUsername(username: string): Promise<User>;
    findByUsernameWithPassword(username: string): Promise<User>;
    findById(userId: number): Promise<User>;
    updateOwnProfile(userId: number, updateUserDto: UpdateUserDto): Promise<User>;
    findMany(query: FindUserDto): Promise<User[]>;
    getOwnWishes(userId: number): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findWishes(username: string): Promise<import("../wishes/entities/wish.entity").Wish[]>;
}
