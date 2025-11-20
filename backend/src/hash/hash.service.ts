import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class HashService {
  // Хеширование пароля с использованием соли
  async hashPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  // Сравнение введенного пароля с хешированным значением
  async comparePassword(password: string, hash: string) {
    return await compare(password, hash);
  }
}
