import { Guid } from '@shared-kernel/type/guid.value-object';
import { UserEntityAggregateRoot } from '../../../user-domain/entity/user.entity-aggregate-root';
import { EmailValueObject } from '../../../user-domain/value-object/email.value-object';
import { PasswordHashValueObject } from '../../../user-domain/value-object/password-hash.value-object';
import { TypeormUserEntity } from '../typeorm-user.entity';
import { RefreshTokenEntity } from '../../../user-domain/entity/refresh-token.entity';
import { UserEntityDto } from '../../../user-contract/dto/user-entity.dto';

export class TypeormUserMapper {
  static toTypeormEntity(entity: UserEntityAggregateRoot): TypeormUserEntity {
    const { id, password, email, role, refreshTokens } = entity.toPlain();

    const tokensEntity = refreshTokens.map((element) => {
      return Object.assign({
        id: element.toPlain().id.getValue(),
        expirationDate: element.toPlain().expirationDate,
        refreshToken: element.toPlain().refreshToken,
        user: element.toPlain().user.getValue(),
      });
    });

    const typeormUserEntity = new TypeormUserEntity();
    typeormUserEntity.id = id.getValue();
    typeormUserEntity.password = password.getValue();
    typeormUserEntity.email = email.getValue();
    typeormUserEntity.role = role;
    typeormUserEntity.refreshTokens = tokensEntity;

    return typeormUserEntity;
  }

  static toDomainEntity(entity: TypeormUserEntity): UserEntityAggregateRoot {
    const { id, email, createdAt, role, password, updatedAt, refreshTokens } =
      entity;
    return UserEntityAggregateRoot.restore({
      id: new Guid(id),
      email: new EmailValueObject(email),
      password: new PasswordHashValueObject(password),
      createdAt,
      updatedAt,
      role,
      refreshTokens: refreshTokens?.map((refreshToken) =>
        RefreshTokenEntity.restore({
          id: new Guid(refreshToken.id),
          refreshToken: refreshToken.refreshToken,
          expirationDate: refreshToken.expirationDate,
          user: new Guid(id),
          createdAt: refreshToken.createdAt,
          updatedAt: refreshToken.updatedAt,
        }),
      ),
    });
  }

  static toDto(entity: TypeormUserEntity): UserEntityDto {
    return new UserEntityDto({
      id: entity.id,
      email: entity.email,
      role: entity.role,
      createdAt: entity.createdAt,
    });
  }
}
