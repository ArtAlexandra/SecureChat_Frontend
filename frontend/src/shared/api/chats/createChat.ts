import type { TChat } from "@/shared/config/ChatType";
import axios from "axios"

interface ICreateChatProps {
    participantIds: string[];
    isGroup?: boolean;
};

export const createChat = ({ participantIds, isGroup = false }: ICreateChatProps): Promise<TChat> => {
    const data = {
        participantIds,
        isGroup
    }
    return axios.post('/chats/create-chat', data, {
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
};