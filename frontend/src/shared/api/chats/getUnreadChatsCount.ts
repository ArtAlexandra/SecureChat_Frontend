import axios from "axios";


export const getUnreadChatsCount = (): Promise<number> => {
    return axios.get(`/chats/unread-chats`, {
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
