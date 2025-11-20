import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../hash/hash.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  // Создание JWT-токена для пользователя
  async getJwtTokenForUser(user: User) {
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  // Проверка имени пользователя и пароля
  async validateUserPassword(username: string, userPassword: string) {
    const user = await this.usersService.findByUsernameWithPassword(username);
    const isAuth = await this.hashService.comparePassword(
      userPassword,
      user.password,
    );

    if (!isAuth) {
      throw new UnauthorizedException(
        'Некорректное имя пользователя или пароль',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
