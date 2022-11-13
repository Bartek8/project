export abstract class BaseValueObject<T = any> {
  protected value: T;

  constructor(props: T) {
    this.value = props;
    if (props) {
      this.validate(props);
    }
  }

  protected validate(props: T): void {}

  public getValue(): T {
    return this.value;
  }

  public isSameAs(valueObject: BaseValueObject<T>): boolean {
    return this.getValue() === valueObject.getValue();
  }
}
