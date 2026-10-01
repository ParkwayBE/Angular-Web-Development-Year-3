import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordPrefixValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value as string;

    if (!password) {
      return null; // Return null if the field is empty
    }

    if (/^[@!]/.test(password)) {
      return null; // Valid password
    } else {
      return { passwordPrefix: true }; // Invalid password
    }
  };
}