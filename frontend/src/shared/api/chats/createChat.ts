import type { TChat } from "@/shared/config/ChatType";
import axios from "axios";

interface ICreateChatProps {
    participantIds: string[];
    isGroup?: boolean;
    groupName?: string;
    file?: File | null;
};

export const createChat = ({ participantIds, isGroup = false, groupName, file = null }: ICreateChatProps): Promise<TChat> => {
    const formData = new FormData();
    
    participantIds.forEach(id => {
        formData.append('participantIds[]', id);
    });
    
    if(isGroup) formData.append('isGroup', 'true');
    
    if (groupName)  formData.append('groupName', groupName);

    if(file) formData.append('file', file);
    
    return axios.post('/chats/create-chat', formData, {
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