import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { usersProviders } from './users.provider';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService, ...usersProviders],
  controllers: [UsersController],
})
export class UsersModule {}
