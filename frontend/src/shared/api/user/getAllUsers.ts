import { TUser } from "@/shared/config/TUser";
import axios from "axios";

export const getAllUsers = (): Promise<TUser[]> => {
    return axios.get('/users/get-all', {
        headers: {
            'Authorization': localStorage.getItem('securechat_token')
        }
    })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
        })
}