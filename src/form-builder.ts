import {
  AbstractControlOptions,
  AbstractControlTyped,
  AsyncValidatorFn,
  FormArrayTyped,
  FormBuilder,
  FormControlTyped,
  FormGroupTyped,
  ValidatorFn,
} from '@angular/forms';

interface InitialFormState<T> {
  /** Form value. */
  value: Partial<T>;
  /** Indicates if control should be disabled. */
  disabled: boolean;
}

// Typing for control configuration inside ControlsConfig
type ControlConfigValue<T> = T | { value: T; disabled: boolean };
type ControlConfigValidators = ValidatorFn | ValidatorFn[];
type ControlConfig<T> =
  | AbstractControlTyped<T>
  | FormArrayTyped<T extends (infer U)[] ? U : T>
  | [ControlConfigValue<T>]
  | [ControlConfigValue<T>, ControlConfigValidators];

// Typing for controls config
type ControlsConfig<T> = {
  [P in keyof T]: ControlConfig<T[P]>;
};

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
      controlsConfig: ControlsConfig<T>,
      options?: AbstractControlOptions | { [key: string]: any } | null,
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
      controlsConfig: ControlsConfig<T>[],
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

FormBuilder.prototype.groupTyped = function <T>(controlsConfig: ControlsConfig<T>, options?: any): FormGroupTyped<T> {
  return this.group(controlsConfig, options) as FormGroupTyped<T>;
};

FormBuilder.prototype.arrayTyped = function <T>(
  controlsConfig: ControlsConfig<T>[],
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormArrayTyped<T> {
  return this.array(controlsConfig, validatorOrOpts, asyncValidator) as FormArrayTyped<T>;
};

FormBuilder.prototype.controlTyped = function <T>(
  formState: Partial<T> | InitialFormState<T>,
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
): FormControlTyped<T> {
  return this.control(formState, validatorOrOpts, asyncValidator) as FormControlTyped<T>;
};
