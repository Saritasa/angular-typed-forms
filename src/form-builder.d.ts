import {
  FormBuilder,
  FormGroupTyped,
  FormArrayTyped,
  FormControlTyped,
  ValidatorFn,
  AbstractControlOptions,
  AsyncValidatorFn,
} from '@angular/forms';

// TODO(Dontsov): Check
// tslint:disable

interface InitialFormState<T> {
  /** Form value. */
  value: Partial<T>;
  /** Indicates if control should be disabled. */
  disabled: boolean;
}

declare module '@angular/forms' {
  /** @inheritdoc */
  export interface FormBuilder {
    /**
     * Generates a form group for specific model.
     * This is a strongly-typed alternative of `group` method.
     * @param controlsConfig Configuration for controls of this model.
     * @param options Additional arguments, see `group` method.
     */
    groupTyped<T>(
      controlsConfig: { [P in keyof T]?: any },
      options?:
        | AbstractControlOptions
        | {
            [key: string]: any;
          }
        | null,
    ): FormGroupTyped<T>;

    /**
     * Constructs a new `FormArrayTyped` from the given array of configurations,
     * validators and options.
     *
     * @param controlsConfig An array of child controls or control configs. Each
     * child control is given an index when it is registered.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of
     * such functions, or an `AbstractControlOptions` object that contains
     * validation functions and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator
     * functions.
     */
    arrayTyped<T>(
      controlsConfig: any[],
      validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
    ): FormArrayTyped<T>;

    /**
     * Construct a new `FormControlTyped` with the given state, validators and options.
     *
     * @param formState Initializes the control with an initial state value, or
     * with an object that contains both a value and a disabled status.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of
     * such functions, or an `AbstractControlOptions` object that contains
     * validation functions and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator
     * functions.
     */
    controlTyped<T>(
      formState: Partial<T> | InitialFormState<T>,
      validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
    ): FormControlTyped<T>;
  }
}

// TODO(Dontsov): Check
// @ts-ignore
FormBuilder.prototype.groupTyped = function <T>(
  controlsConfig: { [P in keyof T]?: any },
  options?: any,
  // TODO(Dontsov): Check
  // @ts-ignore
): FormGroupTyped<T> {
  // TODO(Dontsov): Check
  // @ts-ignore
  return this.group(controlsConfig, options);
};

FormBuilder.prototype.arrayTyped = function <T>(
  controlsConfig: any[],
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  // TODO(Dontsov): Check
  // @ts-ignore
): FormArrayTyped<T> {
  // TODO(Dontsov): Check
  // @ts-ignore
  return this.array(controlsConfig, validatorOrOpts, asyncValidator);
};

FormBuilder.prototype.controlTyped = function <T>(
  formState: Partial<T> | InitialFormState<T>,
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  // TODO(Dontsov): Check
  // @ts-ignore
): FormControlTyped<T> {
  // TODO(Dontsov): Check
  // @ts-ignore
  return this.control(formState, validatorOrOpts, asyncValidator);
};
