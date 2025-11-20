import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Получение данныъ текущего пользователя
  @Get('me')
  async getOwnUser(@Req() { user }: { user: User }) {
    const userData = await this.usersService.findById(user.id);

    if (!userData) {
      throw new NotFoundException('Пользователь не найден');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = userData;
    return result;
  }

  // Обновление профиля текущего пользователя
  @Patch('me')
  async updateOwnProfile(
    @Req() { user }: { user: User },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateOwnProfile(user.id, updateUserDto);
  }

  // Поиск нескольких пользователей
  @Post('find')
  async findUsers(@Body() findUserDto: FindUserDto) {
    return await this.usersService.findMany(findUserDto);
  }

  // Получение одного пользователя
  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  // Получение пожеланий текущего пользователя
  @Get('me/wishes')
  async getOwnWishes(@Req() { user }: { user: User }) {
    return await this.usersService.getOwnWishes(user.id);
  }

  // Получение попожеланий другого пользователя
  @Get(':username/wishes')
  async getWishesByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return await this.usersService.findWishes(user.username);
  }
}
