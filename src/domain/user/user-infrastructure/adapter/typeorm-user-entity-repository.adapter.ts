import { Injectable } from '@nestjs/common';
import { UserEntityAggregateRoot } from '../../user-domain/entity/user.entity-aggregate-root';
import { EmailValueObject } from '../../user-domain/value-object/email.value-object';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeormUserEntity } from '../database/typeorm-user.entity';
import { TypeormUserMapper } from '../database/mapper/typeorm-user.mapper';
import { Guid } from '@shared-kernel/type/guid.value-object';
import { TypeormRefreshTokenEntity } from '../database/typeorm-refresh-token.entity';
import { TypeormRefreshTokenMapper } from '../database/mapper/typeorm-refresh-token.mapper';
import { IUserEntityRepository } from '../../user-domain/ports/user-entity.repository';

@Injectable()
export class TypeormUserEntityRepositoryAdapter
  implements IUserEntityRepository
{
  constructor(
    @InjectRepository(TypeormUserEntity)
    private usersRepository: Repository<TypeormUserEntity>,
    @InjectRepository(TypeormRefreshTokenEntity)
    private refreshTokenRepository: Repository<TypeormRefreshTokenEntity>,
  ) {}

  async findOneByEmail(
    email: EmailValueObject,
  ): Promise<UserEntityAggregateRoot> {
    const user = await this.usersRepository.findOne({
      where: { email: email.getValue() },
    });
    return user ? TypeormUserMapper.toDomainEntity(user) : null;
  }

  async findOneById(id: Guid): Promise<UserEntityAggregateRoot> {
    const user = await this.usersRepository.findOne({
      where: { id: id.getValue() },
    });

    return user ? TypeormUserMapper.toDomainEntity(user) : null;
  }

  async persist(
    userEntity: UserEntityAggregateRoot,
  ): Promise<UserEntityAggregateRoot> {
    const user = TypeormUserMapper.toTypeormEntity(userEntity);
    TypeormRefreshTokenMapper.toTypeormEntity(userEntity, user.id);
    await this.usersRepository.save(user);
    return userEntity;
  }

  async findOneByRefreshToken(
    refreshToken: string,
  ): Promise<UserEntityAggregateRoot> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.refreshTokens', 'refresh_token_entity')
      .where('refresh_token_entity.refreshToken = :refreshToken', {
        refreshToken: refreshToken,
      })
      .getOne();
    return user ? TypeormUserMapper.toDomainEntity(user) : null;
  }
}
