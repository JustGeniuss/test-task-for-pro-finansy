import { Module } from '@nestjs/common';
import { jwtModule } from 'src/modules.config';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
