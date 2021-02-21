import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidator {

    public static hasUpper(control: FormControl): ValidationResult {
        let hasUpper = /[A-Z]/.test(control.value);
        if (!hasUpper) {
            // return what´s not valid
            return { hasUpper: true };
        }
        return null;
    }

    public static hasNumber(control: FormControl): ValidationResult {
        let hasNumber = /\d/.test(control.value);
        if (!hasNumber) {
            // return what´s not valid
            return { hasNumber: true };
        }
        return null;
    }

    public static hasSpecialChar(control: FormControl): ValidationResult {
        let hasSpecialChar = /[^a-zA-Z\d\s:]/.test(control.value);
        if (!hasSpecialChar) {
            // return what´s not valid
            return { hasSpecialChar: true };
        }
        return null;
    }

}