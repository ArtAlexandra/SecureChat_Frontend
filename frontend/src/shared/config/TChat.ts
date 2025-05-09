export type TChat = {
    _id: string;
    participants: string[];
    isGroup: boolean;
    messages: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}