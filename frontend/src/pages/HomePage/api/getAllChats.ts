import type { TChat } from "@/shared/config/ChatType";
import axios from "axios";

export const getAllChats = (): Promise<TChat[]> => {
    return axios.get('/chats/all-chats', {
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