import { TUser } from "@/shared/config/TUser";
import Image from "next/image";

import style from './Messages.module.scss';
import Settings from "@/shared/ui/Settings";
interface IMessagesProps {
    users: TUser[];
};
function Messages({ users }: IMessagesProps) {
    return (
        <div className={style.userList}>
            {
                users.map((user, index) => {
                    return(
                    <div key={`user_${index}`} className={style.userList__item}>
                        <Image src={user.avatar} alt="avatar" width={50} height={50}/>
                        <p>{user.nik}</p>
                    </div>
                    )
                })
            }
            <Settings/>
        </div>
    );
}

export default Messages;