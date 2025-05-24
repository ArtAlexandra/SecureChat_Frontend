import { TInfoChat } from "@/shared/config/TInfoChat";
import axios from "axios";

export const getChatById = (chatId: string): Promise<TInfoChat> => {
    return axios.get(`/chats/chat-by-id/${chatId}`, {
        headers: {
            'Authorization': localStorage.getItem('securechat_token')
        }
    })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error)
        })
}