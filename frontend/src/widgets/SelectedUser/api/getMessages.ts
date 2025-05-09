import axios from "axios";
import type { TMessage } from "@/shared/config/MessagesType";


export const getMessages = (userId: string): Promise<TMessage[]> => {
    return axios.get(`/messages/get-message/${userId}`, {
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
