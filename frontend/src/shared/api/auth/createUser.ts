import axios from "axios";
import { ISignUp } from "@/shared/config/SignUpTypes";

interface ICreateUserProps {
    data: ISignUp;
};

export const createUser = ({data}: ICreateUserProps): Promise<string> => {
    return axios.post('/users/auth/create', data)
    .then(() => {
        return '';
    })
    .catch((error) => {
      console.log(error);
      return error.response.data?.warning;
    })
}