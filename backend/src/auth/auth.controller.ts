import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin') // Логин с локальной проверкой; Возвращаем JWT-токен для пользователя
  async signIn(@Req() req): Promise<{ access_token: string }> {
    return this.authService.getJwtTokenForUser(req.user);
  }

  @Post('signup') // Регистрация нового пользователя
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createNewUser(createUserDto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
