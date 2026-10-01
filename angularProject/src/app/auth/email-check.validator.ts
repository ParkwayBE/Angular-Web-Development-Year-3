import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export function emailAvailableValidator(afAuth: AngularFireAuth): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    const email = control.value;

    if (!email) {
      return Promise.resolve(null);
    }

    return afAuth.fetchSignInMethodsForEmail(email)
      .then((signInMethods: string[]) => {
        return signInMethods.length > 0 ? { emailTaken: true } : null;
      })
      .catch(() => null);
  };
}