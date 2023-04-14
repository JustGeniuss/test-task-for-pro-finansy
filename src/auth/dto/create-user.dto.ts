import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @Length(4, 16, {
    message: 'Имя пользователя должно быть не меньше 4 и не больше 16',
  })
  readonly username: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(4, 16, { message: 'Пароль должен быть не меньше 4 и не больше 16' })
  readonly password: string;
}
