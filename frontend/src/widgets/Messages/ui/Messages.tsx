import style from './Messages.module.scss';
import Settings from "@/shared/ui/Settings";
import clsx from "clsx";
import Search from "./Search";
import { createChat, getAllChats } from "@/shared/api/chats";
import type { TChat, TPopulatedUser } from "@/shared/config/ChatType";
import { useEffect, useState } from 'react';
interface IMessagesProps {
    chats: TChat[];
    onSelect: (user: TPopulatedUser, chatId: string) => void;
    activeId?: string;
};

function Messages({ chats, onSelect, activeId }: IMessagesProps) {
    const [listChats, setListChats] = useState<TChat[]>(chats);

    useEffect(() => {
        if(!chats) return;
        setListChats(chats);
    }, [chats]);

    const handleCreateChat = async (id: string) => {
        await createChat({ participantIds: [id] });
        const list = await getAllChats();
        setListChats(list);
    };

    const handleSelectChat = (chat: TChat ) => {
        onSelect(chat.interlocutor, chat._id);
    };
    return (
        <div>
            <Search onCreateChat={handleCreateChat} />
            <div className={style.userList}>
                {
                    listChats.map((chat, index) => {
                        return (
                            <div key={`user_${index}`} className={clsx(style.userList__item, { [style.userList__item_active]: activeId === chat.interlocutor?._id })} onClick={() => handleSelectChat(chat)}>
                                <p className={style.userList__item__nik}>{chat.interlocutor?.nik}</p>
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