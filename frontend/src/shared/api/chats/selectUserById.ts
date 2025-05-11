import type { TUser } from "@/shared/config/TUser";
import axios from "axios";


export const selectUserById = async (userId: string): Promise<TUser> => {
    return axios.get(`/users/select-id/${userId}`, {
        headers: {
            'Authorization': localStorage.getItem('securechat_token')
        }
    })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.error(error);
            return;
        })
}