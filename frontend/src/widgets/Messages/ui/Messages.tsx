import style from './Messages.module.scss';
import Settings from "@/shared/ui/Settings";
import clsx from "clsx";
import Search from "./Search";
import { createChat } from "../api/createChat";
import type { TChat, TPopulatedUser } from "@/shared/config/ChatType";
interface IMessagesProps {
    chats: TChat[];
    onSelect: (user: TPopulatedUser, chatId: string) => void;
    activeId?: string;
};
function Messages({ chats, onSelect, activeId }: IMessagesProps) {

    const handleCreateChat = async (id: string) => {
        await createChat({ participantIds: [id] });
    };

    const handleSelectChat = (chat: TChat ) => {
        onSelect(chat.interlocutor, chat._id);
    };
    return (
        <div>
            <Search onCreateChat={handleCreateChat} />
            <div className={style.userList}>
                {
                    chats.map((chat, index) => {
                        return (
                            <div key={`user_${index}`} className={clsx(style.userList__item, { [style.userList__item_active]: activeId === chat.interlocutor?._id })} onClick={() => handleSelectChat(chat)}>
                                <p>{chat.interlocutor?.nik}</p>
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