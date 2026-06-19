import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister{
    fullName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ILogin{
    identifier: string;
    password: string;
}

interface IActivation{
    code : string;
}

interface IUserExtended extends User{
    accessToken?: string;
    role?: string
}

interface ISessionExtended extends Session{
    accessToken?: string;
}

interface IJWTExtended extends JWT{
    user?: IUserExtended
}

export type {IRegister, IActivation, IJWTExtended, ISessionExtended, IUserExtended, ILogin}