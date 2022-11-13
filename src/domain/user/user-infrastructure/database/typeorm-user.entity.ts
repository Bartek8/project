import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { schema } from './config/typeorm.config';
import { TypeormRefreshTokenEntity } from './typeorm-refresh-token.entity';

@Entity({ name: 'user_entity', schema })
export class TypeormUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(
    () => TypeormRefreshTokenEntity,
    (refreshTokens) => refreshTokens.user,
    { eager: true, cascade: ['insert'] },
  )
  refreshTokens: TypeormRefreshTokenEntity[];
}
