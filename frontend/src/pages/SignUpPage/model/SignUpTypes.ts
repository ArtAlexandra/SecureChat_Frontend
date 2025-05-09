export interface ISignUp {
    name: string;
    nik: string;
    password: string;
    email: string;
    code?: string;
};


export const enum STEPS {
    FIRST = 'first',
    SECOND = 'second'
};