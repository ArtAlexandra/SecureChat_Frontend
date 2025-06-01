import { TUser } from "./TUser";

export type TInfoChat = {
    _id: string;
    title: string;
    logo: string;
    participants: TUser[];
};

export interface IChangeInfoChat {
    title?: string;
    participants: string[];
    id: string;
}