import { TUser } from "@/shared/config/TUser";
import axios from "axios";

export const updateImage = (file: File): Promise<TUser> => {
    const formData = new FormData();
    formData.append('file', file); 
    
    return axios.patch('/users/update-image', formData, {
        headers: {
            'Authorization': localStorage.getItem('securechat_token')
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data?.warning;
        })
}