// TODO: replace this. import for ngx-jsonapi-material when dynamic forms are added
import {
    DynamicInput,
    TextDynamicInput,
    CheckboxDynamicInput
} from '../../dynamic-forms/dynamic-input';

export let login_form_model: Array<DynamicInput> = [
    new TextDynamicInput('email')
        .addTemplateOptions({type: 'email', placeholder: 'Correo Electrónico'})
        .addTemplateOptions({type: 'email', label: 'Correo Electrónico'})
        .setTemplateOption('placeholder', 'Correo Electrónico')
        .fxFlex(100)
        .required()
        .set('email', true)
        .set('validators', { email: { expression: (c): boolean => !c.value || /[^ @]*@[^ @]*/.test(c.value) }})
        .set('validation', { messages: {
            required: 'Debes colocar tu correo electrónico',
            email: 'Por favor, coloca un correo válido'
        }}),
    new TextDynamicInput('password')
        .addTemplateOptions({type: 'password', placeholder: 'Contraseña'})
        .addTemplateOptions({type: 'password', label: 'Contraseña'})
        .fxFlex(100)
        .required()
];
