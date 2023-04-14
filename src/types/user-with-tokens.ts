import { User } from 'src/users/users.entity';
import { Tokens } from './tokens.type';

export type UserWithoutPass = Pick<
  User,
  'id' | 'username' | 'createdAt' | 'updatedAt'
>;

export type UserWithTokensWithoutPassword = {
  user: UserWithoutPass;
  tokens: Tokens;
};
