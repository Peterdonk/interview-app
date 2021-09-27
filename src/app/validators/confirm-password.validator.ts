import { FormGroup } from '@angular/forms';

/**
 * Custom password validator for confirm password
 * * @param control and matching control name
 * @returns boolean
 */

export function ConfirmPasswordValidator(
  controlName: string,
  matchingControlName: string
): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmPasswordValidator
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
