export type TMessage = {
    _id: string;
    content: string;
    createdAt: string;
    fileUrl: string;
    receiverId: string;
    senderId: string;
    isRead: boolean;
};