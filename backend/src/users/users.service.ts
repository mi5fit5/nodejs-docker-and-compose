import { Injectable, NotFoundException } from '@nestjs/common';
import { HashService } from '../hash/hash.service';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  // Создание нового пользователя
  async createNewUser(createUserDto: CreateUserDto) {
    const { email, username, password, avatar, about } = createUserDto;
    const hashedPassword = await this.hashService.hashPassword(password);
    const newUser = this.userRepository.create({
      email,
      username,
      avatar,
      about,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  // Поиск пользователя по имени (без пароля)
  async findByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) throw new NotFoundException('Пользователь не найден');

    return user;
  }

  // Поиск пользователя по имени (с паролем) - для аутентификации
  async findByUsernameWithPassword(username: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ username })
      .addSelect('user.password')
      .getOne();

    if (!user) throw new NotFoundException('Пользователь не найден');

    return user;
  }

  // Поиск пользователя по id
  async findById(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) throw new NotFoundException('Пользователь не найден');

    return user;
  }

  // Обновление профиля текущего пользователя
  async updateOwnProfile(userId: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;

    if (password) {
      updateUserDto.password = await this.hashService.hashPassword(password);
    }

    await this.userRepository.update(userId, updateUserDto);

    return this.findById(userId);
  }

  // Поиск нескольких пользователей по совпадениям
  async findMany(query: FindUserDto) {
    if (!query.query) return [];

    const users = await this.userRepository.find({
      where: [
        { username: Like(`%${query.query}%`) },
        { email: Like(`%${query.query}%`) },
      ],
    });

    return users;
  }

  // Получение собственных пожеланий
  async getOwnWishes(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'wishes',
        'wishes.owner',
        'wishes.offers',
        'wishes.offers.user',
      ],
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user.wishes;
  }

  // Получение пожеланий другого пользователя
  async findWishes(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: [
        'wishes',
        'wishes.offers',
        'wishes.offers.item',
        'wishes.offers.user',
        'wishes.offers.item.owner',
      ],
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user.wishes;
  }
}
