import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { BaseValueObject } from '@shared-kernel/ddd/base.value-object';
import { isUUID } from 'class-validator';
import { DomainException } from '@shared-kernel/exception/domain.exception';
import { ExceptionEnum } from '@shared-kernel/exception/exception.enum';

export class Guid extends BaseValueObject<string> {
  @ApiProperty({ format: 'uuid' })
  protected value: string;
  public static new(): Guid {
    return new Guid(uuid());
  }

  protected validate(): void {
    if (!isUUID(this.value))
      throw new DomainException(ExceptionEnum.INVALID_GUID_FORMAT);
  }
}
