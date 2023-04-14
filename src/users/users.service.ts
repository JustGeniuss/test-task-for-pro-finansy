import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userRepository: typeof User,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    return user;
  }
}
