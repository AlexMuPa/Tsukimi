import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function  passwordMatching(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    return !(control.value.confirmPassword === control.value.password)? {passwordMatching: false}: null;
  }
}
