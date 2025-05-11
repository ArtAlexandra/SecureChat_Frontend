import axios from "axios";
import { ISignUp } from "@/shared/config/SignUpTypes";

interface ISendEmailCode {
    data: ISignUp;
};
export const sendEmailCode = ({data}: ISendEmailCode): Promise<string> => {
    return  axios.post('/users/auth/send-code', data)
    .then(() => {
        return '';
    })
    .catch((error) => {
        console.error(error)
        return error.response.data?.warning;
    })
}