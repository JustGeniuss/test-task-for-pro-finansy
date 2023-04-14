import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { BackendValidationPipe } from 'src/common/pipes';
import { LocalAuthGuard, RefreshTokenGuard } from '../common/guards';
import { Tokens, UserWithTokensWithoutPassword } from '../types';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new BackendValidationPipe())
  register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithTokensWithoutPassword> {
    return this.authService.registration(createUserDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new BackendValidationPipe())
  login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserWithTokensWithoutPassword> {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(refreshToken);
  }
}
