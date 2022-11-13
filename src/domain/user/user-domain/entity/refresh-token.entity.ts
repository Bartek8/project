import { Guid } from '@shared-kernel/type/guid.value-object';

export interface IRefreshTokenEntity {
  id: Guid;
  user: Guid;
  expirationDate: Date;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class RefreshTokenEntity {
  private id: Guid;
  private user: Guid;
  private expirationDate: Date;
  private refreshToken: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  static restore(payload: IRefreshTokenEntity): RefreshTokenEntity {
    const {
      id,
      user,
      expirationDate,
      refreshToken,
      createdAt,
      updatedAt,
      deletedAt,
    } = payload;
    const refreshTokenEntity = new RefreshTokenEntity();
    refreshTokenEntity.id = id;
    refreshTokenEntity.user = user;
    refreshTokenEntity.expirationDate = expirationDate;
    refreshTokenEntity.refreshToken = refreshToken;
    refreshTokenEntity.createdAt = createdAt;
    refreshTokenEntity.updatedAt = updatedAt;
    refreshTokenEntity.deletedAt = deletedAt;
    return refreshTokenEntity;
  }

  toPlain(): IRefreshTokenEntity {
    return {
      id: this.id,
      user: this.user,
      expirationDate: this.expirationDate,
      refreshToken: this.refreshToken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  async isValid(expirationDate: Date): Promise<boolean> {
    const now = new Date();
    return expirationDate <= now;
  }
}
