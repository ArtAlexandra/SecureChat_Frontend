import axios from "axios";
import type { TMessage } from "@/shared/config/MessagesType";


export const getMessages = (chatId: string): Promise<TMessage[]> => {
    return axios.get(`/chats/messages/${chatId}`, {
        headers: {
            'Authorization': localStorage.getItem('securechat_token')
        }
    })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
};
