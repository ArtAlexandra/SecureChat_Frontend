import { TUser } from "@/shared/config/TUser";

import style from './Messages.module.scss';
import Settings from "@/shared/ui/Settings";
import clsx from "clsx";
import Search from "@/shared/ui/Search";
interface IMessagesProps {
    users: TUser[];
    onSelect: (user: TUser) => void;
    activeId?: string;
};
function Messages({ users, onSelect, activeId }: IMessagesProps) {
    const handleSeacrh = (value: string) => {
        console.log(value);
    }
    return (
        <div>
            <Search onChange={handleSeacrh} />
            <div className={style.userList}>
                {
                    users.map((user, index) => {
                        return (
                            <div key={`user_${index}`} className={clsx(style.userList__item, { [style.userList__item_active]: activeId === user._id })} onClick={() => onSelect(user)}>
                                <p>{user.nik}</p>
                            </div>
                        )
                    })
                }
                <Settings />
            </div>
        </div>

    );
}

export default Messages;