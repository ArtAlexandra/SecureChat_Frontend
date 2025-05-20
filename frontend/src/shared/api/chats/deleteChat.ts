import axios from "axios";

export const deleteChat = (userId: string): Promise<void> => {
    return axios.delete(`/chats/delete/${userId}`, {
        headers: {
            'Authorization': localStorage.getItem('securechat_token')
        }
    })
        .then(() => {
            return;
        })
        .catch((error) => {
            console.error(error)
        })
}