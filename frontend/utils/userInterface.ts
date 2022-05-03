
export interface userRegisterDataProps {
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
