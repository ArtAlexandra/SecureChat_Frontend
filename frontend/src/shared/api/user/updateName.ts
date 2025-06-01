import axios from "axios";

export const updateName = (name: string, id: string): Promise<string> => {
    const data = {
        name
    };
    return axios.patch(`/users/update-name/${id}`, data, {
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