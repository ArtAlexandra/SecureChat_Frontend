export type TPopulatedUser = {
    _id: string;
    nik: string;
    email: string;
};

export type TChat = {
    _id: string;
    participants: TPopulatedUser[];
    isGroup: boolean;
    groupName?: string;
    messages: string[];
    lastMessage?: {
        content: string;
        createdAt: Date;
    };
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
    interlocutor: TPopulatedUser;
};
