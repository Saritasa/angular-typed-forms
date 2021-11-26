// Defines strongly-typed form controls

// Basic types defined in @angular/forms + rxjs/Observable
import { DeepPartial } from './deep-partial';

type FormGroup = import('@angular/forms').FormGroup;
type FormArray = import('@angular/forms').FormArray;
type FormControl = import('@angular/forms').FormControl;
type AbstractControl = import('@angular/forms').AbstractControl;
type AbstractControlOptions = import('@angular/forms').AbstractControlOptions;
type AsyncValidatorFn = import('@angular/forms').AsyncValidatorFn;
type ValidatorFn = import('@angular/forms').ValidatorFn;
type Observable<T> = import('rxjs').Observable<T>;

// List of all available statuses, for some reason Angular does not define it.
type STATUS = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';

export type stringKeys<T> = Extract<keyof T, string>;

declare module '@angular/forms' {
  export class AbstractControlTyped<T> extends AbstractControl {
    // Base props and methods common to FormControl/FormGroup/FormArray
    readonly value: T;
    readonly valueChanges: Observable<T>;
    readonly status: STATUS;
    readonly statusChanges: Observable<STATUS>;

    get<V = unknown>(
      path: (stringKeys<T> | string | number)[] | stringKeys<T> | string,
    ): AbstractControlTyped<V> | null;

    setValue(value: Partial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    patchValue(value: DeepPartial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    reset(value?: DeepPartial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  }

  // tslint:disable-next-line:max-classes-per-file
  export class FormControlTyped<T> extends FormControl {
    constructor(
      formState?: T,
      validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
    );

    // Copied from AbstractControlTyped<T> because typescript does not support extending from multiple classes
    readonly value: T;
    readonly valueChanges: Observable<T>;
    readonly status: STATUS;
    readonly statusChanges: Observable<STATUS>;

    get<V = unknown>(
      path: (stringKeys<T> | string | number)[] | stringKeys<T> | string,
    ): AbstractControlTyped<V> | null;

    setValue(value: Partial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    patchValue(value: DeepPartial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    reset(value?: DeepPartial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  }

  // tslint:disable-next-line:max-classes-per-file
  export class FormGroupTyped<T> extends FormGroup {
    // Props and methods specific to FormGroup
    constructor(
      controls: { [P in keyof T]: AbstractControlTyped<T[P]> },
      validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
    );

    controls: { [P in keyof T]: AbstractControlTyped<T[P]> };

    registerControl<P extends stringKeys<T>>(name: P, control: AbstractControlTyped<T[P]>): AbstractControlTyped<T[P]>;

    addControl<P extends stringKeys<T>>(name: P, control: AbstractControlTyped<T[P]>): void;

    removeControl(name: stringKeys<T>): void;

    setControl<P extends stringKeys<T>>(name: P, control: AbstractControlTyped<T[P]>): void;

    contains(name: stringKeys<T>): boolean;

    get<P extends stringKeys<T>, V>(path: P): T[P] extends V[] ? FormArrayTyped<V> : AbstractControlTyped<T[P]>;
    get<P extends stringKeys<T>, K>(path: P): K;
    get<V = unknown>(
      path: (stringKeys<T> | string | number)[] | stringKeys<T> | string,
    ): AbstractControlTyped<V> | null;

    getRawValue(): T & { [disabledProp in string | number]: any };

    // Copied from AbstractControlTyped<T> because typescript does not support extending from multiple classes
    readonly value: T;
    readonly valueChanges: Observable<T>;
    readonly status: STATUS;
    readonly statusChanges: Observable<STATUS>;

    setValue(value: Partial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    patchValue(value: DeepPartial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    reset(value?: DeepPartial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  }

  // tslint:disable-next-line:max-classes-per-file
  export class FormArrayTyped<T> extends FormArray {
    // Props and methods specific to FormArray
    constructor(
      controls: AbstractControlTyped<T>[],
      validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
    );

    controls: AbstractControlTyped<T>[];

    at(index: number): AbstractControlTyped<T>;

    push<V extends T = T>(ctrl: AbstractControlTyped<V>): void;

    insert<V extends T = T>(index: number, control: AbstractControlTyped<V>): void;

    setControl<V extends T = T>(index: number, control: AbstractControlTyped<V>): void;

    getRawValue(): T[];

    setValue(value: Partial<T>[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    patchValue(value: DeepPartial<T>[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    reset(value?: DeepPartial<T>[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

    readonly value: T[];
    readonly valueChanges: Observable<T[]>;

    // Copied from AbstractControlTyped<T> because typescript does not support extending from multiple classes
    readonly status: STATUS;
    readonly statusChanges: Observable<STATUS>;

    get<V = unknown>(
      path: (stringKeys<T> | string | number)[] | stringKeys<T> | string,
    ): AbstractControlTyped<V> | null;
  }
}
