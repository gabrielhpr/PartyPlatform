
export interface userRegisterDataProps {
    accept: string;
    fullName: string;
    email: string;
    phone: string;
    whatsapp: string;
    password: string;
    passwordConfirmation: string;
    location: string;
    city: string;
    state: string;
    country: string;
}

export const userRegisterDataNullState = {
    accept: '',
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    password: '',
    passwordConfirmation: '',
    location: '',
    city: '',
    state: '',
    country: ''
}

export interface userRegisterDataFormErrorProps extends userRegisterDataProps {
}

export const userRegisterDataFormErrorNullState = {
    accept: '',
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    password: '',
    passwordConfirmation: '',
    location: '',
    city: '',
    state: '',
    country: ''
}
