import { Provider } from '@nestjs/common';
import { InMemoryUserEntityRepositoryAdapter } from './in-memory-user-entity-repository.adapter';
import { BcryptPasswordHasherAdapter } from './bcrypt-password-hasher.adapter';
import { TypeormUserEntityRepositoryAdapter } from './typeorm-user-entity-repository.adapter';
import { JwtServiceAdapter } from './jwt-service.adapter';
import { TypeormUserProjectionRepositoryAdapter } from './typeorm-user-projection-repository.adapter';
import { infrastructureRequired } from '@infrastructure/config/config-factory';
import { PASSWORD_SERVICE_TOKEN } from '../../user-domain/ports/password.service';
import { USER_ENTITY_REPOSITORY_TOKEN } from '../../user-domain/ports/user-entity.repository';
import { JWT_SERVICE_TOKEN } from '../../user-domain/ports/jwt.service';
import { USER_PROJECTION_REPOSITORY_TOKEN } from '../../user-domain/ports/user-projection.repository';
import { InMemoryUserProjectionRepositoryAdapter } from './in-memory-user-projection-repository.adapter';

export const userInfrastructureAdapters: Provider[] = [
  {
    provide: USER_ENTITY_REPOSITORY_TOKEN,
    useClass: infrastructureRequired()
      ? TypeormUserEntityRepositoryAdapter
      : InMemoryUserEntityRepositoryAdapter,
  },
  {
    provide: USER_PROJECTION_REPOSITORY_TOKEN,
    useClass: infrastructureRequired()
      ? TypeormUserProjectionRepositoryAdapter
      : InMemoryUserProjectionRepositoryAdapter,
  },
  {
    provide: PASSWORD_SERVICE_TOKEN,
    useClass: BcryptPasswordHasherAdapter,
  },
  { provide: JWT_SERVICE_TOKEN, useClass: JwtServiceAdapter },
];
