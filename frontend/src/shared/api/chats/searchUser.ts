import type { TUser } from "@/shared/config/TUser";
import axios from "axios";

export const searchUser = (value: string): Promise<TUser[]> => {

    return axios.get(`users/find/${value}`, {
        headers: {
            'Authorization': localStorage.getItem('securechat_token')
        }
    })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((error) => {
            console.error(error)
        })
};