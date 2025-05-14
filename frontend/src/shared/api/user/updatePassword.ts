import axios from "axios";

export const updatePassword = (password: string): Promise<string> => {
    const data = {
        password
    };
    return axios.patch('/users/update-password', data, {
        headers: {
            'Authorization': localStorage.getItem('securechat_token')
        }
    })
        .then(() => {
            return "";
        })
        .catch((error) => {
            return error.response.data?.warning;
        })
}