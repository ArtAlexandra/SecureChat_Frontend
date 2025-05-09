import axios from "axios";

interface ISendMessageProps {
    receiverId: string;
    content: string;
};

export const sendMessage = async ({receiverId, content}: ISendMessageProps) => {
    const data = {
        receiverId,
        content
    };

    return axios.post(`/messages/send`, data, {
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