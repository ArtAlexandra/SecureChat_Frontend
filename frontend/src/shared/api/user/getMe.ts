import { TUser } from "@/shared/config/TUser";
import axios from "axios";

export const getMe = (): Promise<TUser> => {
    return axios.get('/users/me', {
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