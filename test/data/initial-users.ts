import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';
import { CreateUserCommand } from '../../src/domain/user/user-application/create-user/create-user.command';

export const InitialUsers: {
  ADMIN: CreateUserCommand;
  USER: CreateUserCommand;
} = {
  ADMIN: {
    email: 'admin@project.com',
    password: 'Secret1!',
    role: UserRoleEnum.ADMIN,
  },
  USER: {
    email: 'user@project.com',
    password: 'Secret1!',
    role: UserRoleEnum.USER,
  },
};
