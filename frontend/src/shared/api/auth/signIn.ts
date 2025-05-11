import axios from "axios";
interface ISignInProps {
    nik: string;
    password: string;
};
export const signIn = ({nik, password}: ISignInProps): Promise<string> => {
    const data = {
        nik,
        password
    };

    return axios.post('/users/signin', data)
    .then((res) => {
        localStorage.setItem('securechat_token', "Bearer " + res.data.access_token)
        localStorage.setItem('userId', res.data.user.id)
        return "";
    })
    .catch((error) => {
       return error.response.data?.warning;
    })
}