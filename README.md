# Angular Typed Forms

## Installation

```
$ npm i -S angular-typed-forms
```

After installation, import this module to main file of your project:

```js
import 'angular-typed-forms';
```

## Examples:

```typescript
import { FormBuilder, FormGroupTyped } from '@angular/forms';


interface UserForm {
  firstName: string;
  lastName: string;
  phone: string;
  numbers: number[];
}

@Component({
  // ...
})
export class ExampleComponent {
  /** Example of formBuilder for FormGroup */
  public form = this.fb.groupTyped<UserForm>({
    firstName: [''],
    lastName: [''],
    /** Example of formBuilder for FormControl */
    phoneNumber: this.fb.controlTyped<string>(''),
    /** Example of manual creating for FormArray */
    numbers: new FormArrayTyped<number>([
      /** Example of manual creating for FormControl */
      new FormControlTyped<number>(1),
      this.fb.controlTyped<number>(2),
    ]),
  });

  public constructor(private readonly fb: FormBuilder) {}
}
```
