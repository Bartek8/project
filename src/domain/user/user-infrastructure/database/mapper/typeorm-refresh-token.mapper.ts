import { TypeormRefreshTokenEntity } from '../typeorm-refresh-token.entity';
import { UserEntityAggregateRoot } from '../../../user-domain/entity/user.entity-aggregate-root';

export class TypeormRefreshTokenMapper {
  static toTypeormEntity(
    entity: UserEntityAggregateRoot,
    user: string,
  ): TypeormRefreshTokenEntity[] {
    const { refreshTokens } = entity.toPlain();
    return refreshTokens.map((refreshToken) => {
      const refreshTokenPayload = refreshToken.toPlain();
      return Object.assign(new TypeormRefreshTokenEntity(), {
        id: refreshTokenPayload.id.getValue(),
        expirationDate: refreshTokenPayload.expirationDate,
        refreshToken: refreshTokenPayload.refreshToken,
        user,
      });
    });
  }
}
