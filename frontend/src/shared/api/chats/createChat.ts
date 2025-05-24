import type { TChat } from "@/shared/config/ChatType";
import axios from "axios"

interface ICreateChatProps {
    participantIds: string[];
    isGroup?: boolean;
    groupName?: string;
};

export const createChat = ({ participantIds, isGroup = false, groupName }: ICreateChatProps): Promise<TChat> => {
    const data = {
        participantIds,
        isGroup,
        groupName
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