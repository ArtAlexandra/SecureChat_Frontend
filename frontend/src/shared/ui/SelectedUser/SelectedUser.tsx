import { TMessage } from "@/shared/config/MessagesType";
import { TUser } from "@/shared/config/TUser";
import Image from "next/image";
import style from './SelectedUser.module.scss';

interface ISelectedUseProps {
    user: TUser;
    messages: TMessage[];
}
function SelectedUser({user, messages}: ISelectedUseProps) {
    return(
        <div className={style.selected}>
            <div className={style.selected__header}>
            <Image src={user.avatar} alt="user" width={50} height={50}/>
            <p>{user.nik}</p>
            </div>
            <div>
                {messages.map((message, index) => {
                    return(
                        <div key={`mes_${index}`} className={style.selected__message}>
                            {message.value}
                            {message.image && 
                            <Image src={message.image} alt="image_user" width={300} height={400}/>
                }
                            </div>
                    )
                })}
            </div>
        </div>
    );
}
export default SelectedUser;