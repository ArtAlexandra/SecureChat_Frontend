import axios from "axios";

export const sendMessage = async (chatId: string, data: FormData) => {
   
    return axios.post(`/chats/send-messages/${chatId}`, data, {
        headers: {
            'Authorization': localStorage.getItem('securechat_token')
        }
    })
        .then(() => {
        })
        .catch((error) => {
            console.error(error)
        })
}