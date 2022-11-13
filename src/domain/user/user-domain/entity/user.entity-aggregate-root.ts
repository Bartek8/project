import { EmailValueObject } from '../value-object/email.value-object';
import { AggregateRoot } from '@shared-kernel/ddd/aggregate-root';
import { DomainException } from '@shared-kernel/exception/domain.exception';
import { UserDomainExceptionEnum } from '../exception/user-domain-exception.enum';
import { UserRegisteredDomainEvent } from '../domain-event/user-registered.domain-event';
import { UserRoleEnum } from '@shared-kernel/auth/user-role.enum';
import { CreateUserPayloadDto } from '../dto/create-user-payload.dto';
import { PasswordHashValueObject } from '../value-object/password-hash.value-object';
import { LoginUserPayloadDto } from '../dto/login-user-payload.dto';
import { AuthUser } from '@shared-kernel/auth/auth.user';
import { JwtValueObject } from '../value-object/jwt.value-object';
import { RefreshTokenEntity } from './refresh-token.entity';
import { Guid } from '@shared-kernel/type/guid.value-object';
import { IPasswordService } from '../ports/password.service';
import { UserCreatedDomainEvent } from '../domain-event/user-created.domain-event';

export interface IUserEntityAggregateRoot {
  id: Guid;
  email: EmailValueObject;
  password: PasswordHashValueObject;
  createdAt: Date;
  updatedAt: Date;
  role: UserRoleEnum;
  refreshTokens: RefreshTokenEntity[];
}
export class UserEntityAggregateRoot extends AggregateRoot {
  private email: EmailValueObject;
  private password: PasswordHashValueObject;
  private createdAt: Date;
  private updatedAt: Date;
  private role: UserRoleEnum;
  private refreshTokens: RefreshTokenEntity[] = [];

  static restore(payload: IUserEntityAggregateRoot): UserEntityAggregateRoot {
    const { id, email, password, createdAt, updatedAt, role, refreshTokens } =
      payload;
    const userEntity = new UserEntityAggregateRoot(id);
    userEntity.email = email;
    userEntity.password = password;
    userEntity.createdAt = createdAt;
    userEntity.updatedAt = updatedAt;
    userEntity.role = role;
    userEntity.refreshTokens = refreshTokens;
    return userEntity;
  }

  public toPlain(): IUserEntityAggregateRoot {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      refreshTokens: this.refreshTokens,
    };
  }

  public async register(payload: CreateUserPayloadDto): Promise<void> {
    const { email, password } = payload;

    this.email = email;
    this.password = password;
    this.role = payload.role || UserRoleEnum.USER;

    this.domainEvents.push(
      new UserRegisteredDomainEvent({
        id: this.id,
        email: this.email,
        role: this.role,
        createdAt: this.createdAt,
      }),
    );
  }

  public async create(payload: CreateUserPayloadDto): Promise<void> {
    const { email, password, role } = payload;

    this.email = email;
    this.password = password;
    this.role = role;

    this.domainEvents.push(
      new UserCreatedDomainEvent({
        id: this.id,
        email: this.email,
        role: this.role,
        createdAt: this.createdAt,
      }),
    );
  }

  async validateUser(
    loginPayload: LoginUserPayloadDto,
    passwordService: IPasswordService,
  ): Promise<void> {
    const { password } = loginPayload;
    if (!(await passwordService.compare(password, this.password))) {
      throw new DomainException(UserDomainExceptionEnum.INVALID_CREDENTIALS);
    }
  }

  addToken(jwtValueObject: JwtValueObject): void {
    const refreshTokenEntity = RefreshTokenEntity.restore({
      id: Guid.new(),
      refreshToken: jwtValueObject.getValue().refreshToken,
      user: this.id,
      expirationDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.refreshTokens.push(refreshTokenEntity);
  }

  async validateRefreshToken(refreshToken: string): Promise<void> {
    const refreshTokenEntity = this.refreshTokens.find(
      (tokenEntity) => tokenEntity.toPlain().refreshToken === refreshToken,
    );

    const expirationDate = refreshTokenEntity.toPlain().expirationDate;
    if (
      !refreshTokenEntity ||
      !(await refreshTokenEntity.isValid(expirationDate))
    ) {
      throw new DomainException(UserDomainExceptionEnum.UNAUTHORIZED);
    }
  }

  public toAuthUser(): AuthUser {
    return {
      userId: this.id.getValue(),
      role: this.role,
    };
  }
}
