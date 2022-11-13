import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from './refresh-token.command';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '@shared-kernel/exception/not-found.exception';
import { UserDomainExceptionEnum } from '../../user-domain/exception/user-domain-exception.enum';
import {
  IUserEntityRepository,
  USER_ENTITY_REPOSITORY_TOKEN,
} from '../../user-domain/ports/user-entity.repository';
import {
  IJwtService,
  JWT_SERVICE_TOKEN,
} from '../../user-domain/ports/jwt.service';
import { JwtDto } from '../../user-contract/dto/jwt.dto';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(
    @Inject(USER_ENTITY_REPOSITORY_TOKEN)
    private readonly userEntityRepository: IUserEntityRepository,
    @Inject(JWT_SERVICE_TOKEN)
    private readonly jwtService: IJwtService,
  ) {}
  public async execute(command: RefreshTokenCommand): Promise<JwtDto> {
    const { refreshToken } = command;

    const userEntityAggregateRoot =
      await this.userEntityRepository.findOneByRefreshToken(refreshToken);

    if (!userEntityAggregateRoot) {
      throw new NotFoundException(UserDomainExceptionEnum.USER_NOT_FOUND);
    }

    await userEntityAggregateRoot.validateRefreshToken(refreshToken);
    const accessToken = await this.jwtService.signToken(
      userEntityAggregateRoot.toAuthUser(),
    );

    return new JwtDto({
      accessToken: accessToken.getValue().accessToken,
      refreshToken,
    });
  }
}
