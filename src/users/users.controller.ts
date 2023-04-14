import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { AuthentificatedGuard } from 'src/common/guards';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('profile')
  @UseGuards(AuthentificatedGuard)
  getProfile(@GetCurrentUser() user: string) {
    return user;
  }

  @Get(':id')
  @UseGuards(AuthentificatedGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
