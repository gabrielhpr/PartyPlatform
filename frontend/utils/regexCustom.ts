const monetaryRegex = /^([0-9]{1,3}\.([0-9]{3}\.)*[0-9]{3}|[0-9]+)(,[0-9][0-9])?$/;
const validTextRegex = /^[^'"`]*$/;
const invalidTextRegex = 'Texto inválido! Aspas não são permitidas!';
const dateRegex = /^([0]?[1-9]|[12][0-9]|3[01])\/([0]?[1-9]|1[0-2])\/(19[0-9]{2}|2[0-9]{3})$/;
const passwordStrongRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*_]){1,}).{8,}$/;

export {
    monetaryRegex, 
    validTextRegex, 
    invalidTextRegex, 
    dateRegex, 
    passwordStrongRegex
};