import { MdContext } from 'md-ui-kit/common';

export interface IMdComboBoxImplicitContext<T, R> {
  $implicit: T;
  item?: R;
}

export class MdSelectionEvent<T, R> {
  constructor(readonly value: T | null, readonly item?: R) { }
}

export class MdComboBoxContext<T, R> extends MdContext {
  constructor(override readonly $implicit: T, readonly item?: R) {
    super($implicit);
  }

  override get polymorpheusOutlet(): IMdComboBoxImplicitContext<T, R> {
    return {
      $implicit: this.$implicit,
      item: this.item,
    };
  }
}
