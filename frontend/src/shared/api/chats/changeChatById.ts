import type { TChat } from "@/shared/config/ChatType";
import { IChangeInfoChat } from "@/shared/config/TInfoChat";
import axios from "axios";



interface ICreateChatProps {
    data: IChangeInfoChat;
    file?: File | null;
};

export const changeChatById = ({ data, file = null}: ICreateChatProps): Promise<TChat> => {
    const formData = new FormData();
    
    data.participants.forEach(id => {
        formData.append('participantIds[]', id);
    });
    
    if (data.title) {
        formData.append('title', data.title);
    }

    if(file) formData.append('file', file);
    
    return axios.patch(`/chats/chat-by-id/${data.id}`, formData, {
        headers: {
            'Authorization': localStorage.getItem('securechat_token'),
        }
    })
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        console.error(error);
    });
};