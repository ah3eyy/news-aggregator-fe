export type IRegister = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type ILogin = {
    email: string;
    password: string;
}
