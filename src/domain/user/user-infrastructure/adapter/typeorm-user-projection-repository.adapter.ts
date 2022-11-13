import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeormUserEntity } from '../database/typeorm-user.entity';
import { TypeormUserMapper } from '../database/mapper/typeorm-user.mapper';
import { UserEntityDto } from '../../user-contract/dto/user-entity.dto';
import { Guid } from '@shared-kernel/type/guid.value-object';
import { IUserProjectionRepository } from '../../user-domain/ports/user-projection.repository';

@Injectable()
export class TypeormUserProjectionRepositoryAdapter
  implements IUserProjectionRepository
{
  constructor(
    @InjectRepository(TypeormUserEntity)
    private usersRepository: Repository<TypeormUserEntity>,
  ) {}

  async findOneById(id: Guid): Promise<UserEntityDto> {
    const user = await this.usersRepository.findOne({
      where: { id: id.getValue() },
    });

    return user ? TypeormUserMapper.toDto(user) : null;
  }

  async list(): Promise<UserEntityDto[]> {
    return (await this.usersRepository.find()).map(
      (userEntity) =>
        new UserEntityDto({
          id: userEntity.id,
          email: userEntity.email,
          createdAt: userEntity.createdAt,
          role: userEntity.role,
        }),
    );
  }
}
