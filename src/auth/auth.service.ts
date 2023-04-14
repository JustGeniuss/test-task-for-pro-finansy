import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { User } from 'src/users/users.entity';
import { JwtPayload, Tokens, UserWithTokensWithoutPassword } from '../types';
import { UsersService } from '../users/users.service';
import { LoginUserDto, CreateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(userDto: LoginUserDto): Promise<UserWithTokensWithoutPassword> {
    const { id, username, createdAt, updatedAt } = await this.validateUser(
      userDto,
    );

    const tokens = await this.generateToken({
      id,
      username,
    });

    return { user: { id, username, createdAt, updatedAt }, tokens };
  }

  async registration(
    userDto: CreateUserDto,
  ): Promise<UserWithTokensWithoutPassword> {
    const candidate = await this.userService.getUserByUsername(
      userDto.username,
    );

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким username существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await hash(userDto.password, 5);

    const { id, username, createdAt, updatedAt } =
      await this.userService.createUser({
        ...userDto,
        password: hashPassword,
      });

    const tokens = await this.generateToken({
      id,
      username,
    });

    return {
      user: { id, username, createdAt, updatedAt },
      tokens,
    };
  }

  private async generateToken(jwtPayload: JwtPayload): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('AT_SECRET'),
        expiresIn: this.configService.get<string>('AT_EXPIRES'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('RT_SECRET'),
        expiresIn: this.configService.get<string>('RT_EXPIRES'),
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async validateUser(userDto: LoginUserDto): Promise<User> {
    const user = await this.userService.getUserByUsername(userDto.username);
    const passwordEquals = await compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    });
  }

  async refreshTokens(rt: string): Promise<Tokens> {
    const { username, id } = await this.jwtService.verifyAsync<JwtPayload>(rt, {
      secret: this.configService.get<string>('RT_SECRET'),
    });

    const tokens = await this.generateToken({ username, id });

    return tokens;
  }
}
