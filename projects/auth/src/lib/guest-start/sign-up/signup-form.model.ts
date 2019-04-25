import { FormlyFieldConfig } from '@ngx-formly/core';

export const signup_form: Array<FormlyFieldConfig> = [
    {
        key: 'first_name',
        type: 'input',
        focus: true,
        templateOptions: {
            appearance: 'outline',
            placeholder: 'Nombre',
            required: true
        }
    },
    {
        key: 'last_name',
        type: 'input',
        templateOptions: {
            appearance: 'outline',
            placeholder: 'Apellido',
            required: true
        }
    },
    {
        key: 'email',
        type: 'input',
        templateOptions: {
            appearance: 'outline',
            placeholder: 'Correo electrónico',
            required: true,
            pattern: '[^ @]*@[^ @]*'
        },
        validation: {
            messages: {
                pattern: (error, field: FormlyFieldConfig): string => `"${field.formControl.value}" no es un correo válido`
            }
        }
    },
    {
        key: 'password',
        type: 'input',
        templateOptions: {
            appearance: 'outline',
            placeholder: 'Contraseña',
            type: 'password',
            required: true,
            minLength: 4
        },
        validation: {
            messages: {
                minlength: 'La contraseña es demasiado corta'
            }
        }
    },
    {
        key: 'confirm_password',
        type: 'input',
        templateOptions: {
            appearance: 'outline',
            placeholder: 'Repetir contraseña',
            type: 'password',
            required: true,
            minLength: 4
        },
        validation: {
            messages: {
                minlength: 'La contraseña es demasiado corta'
            }
        }
    },
    {
        key: 'conditions',
        type: 'checkbox',
        templateOptions: {
            indeterminate: false,
            hidden: true,
            label: 'Estoy de acuerdo con todos los <a href="#">términos y condiciones del servicio.</a>',
            requiredTrue: true
        },
        validators: {
            checked: {
                expression: (password): boolean => password.value === true,
                message: 'Debes aceptar los términos y condiciones del servicio'
            }
        }
    }
];
