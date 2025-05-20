import axios from "axios";

export const deleteMessage = (messageId: string): Promise<void> => {
    return axios.delete(`/messages/delete/${messageId}`, {
        headers: {
            'Authorization': localStorage.getItem('securechat_token')
        }
    })
        .then(() => {
            return ;
        })
        .catch((error) => {
            console.error(error)
        })
}