import axios from "axios";

interface ISendMessageProps {
    receiverId: string;
    content: string;
    chatId: string;
};

export const sendMessage = async ({receiverId, content, chatId}: ISendMessageProps) => {
    const data = {
        receiverId,
        content
    };
    return axios.post(`/chats/send-messages/${chatId}`, data, {
        headers: {
            'Authorization': localStorage.getItem('securechat_token')
        }
    })
        .then(() => {
        })
        .catch((error) => {
            console.error(error)
        })
}