import { TUser } from "@/shared/config/TUser";

import style from './Messages.module.scss';
import Settings from "@/shared/ui/Settings";
interface IMessagesProps {
    users: TUser[];
    onSelect: (user: TUser) => void;
};
function Messages({ users, onSelect }: IMessagesProps) {
    return (
        <div className={style.userList}>
            {
                users.map((user, index) => {
                    return(
                    <div key={`user_${index}`} className={style.userList__item} onClick={() => onSelect(user)}>
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