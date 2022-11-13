import { Provider } from '@nestjs/common';
import { RegisterUserDomainService } from './register-user.domain-service';
import { UserUniqueEmailDomainService } from './user-unique-email.domain-service';

export const userDomainServices: Provider[] = [
  RegisterUserDomainService,
  UserUniqueEmailDomainService,
];
