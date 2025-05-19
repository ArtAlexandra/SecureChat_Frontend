import style from './Messages.module.scss';
import clsx from "clsx";
import Search from "./Search";
import { createChat, getAllChats } from "@/shared/api/chats";
import type { TChat, TPopulatedUser } from "@/shared/config/ChatType";
import { useEffect, useState } from 'react';
import Settings from '@/widgets/Settings';
import Image from 'next/image';

interface IMessagesProps {
    chats: TChat[];
    onSelect: (user: TPopulatedUser, chatId: string) => void;
    activeId?: string;
};

function Messages({ chats, onSelect, activeId }: IMessagesProps) {
    const [listChats, setListChats] = useState<TChat[]>(chats);

    useEffect(() => {
        if (!chats) return;
        setListChats(chats);
    }, [chats]);

    const handleCreateChat = async (id: string) => {
        await createChat({ participantIds: [id] });
        const list = await getAllChats();
        setListChats(list);
    };

    const handleSelectChat = (chat: TChat) => {
        onSelect(chat.interlocutor, chat._id);
    };
    return (
        <div>
            <Settings>
                <Search onCreateChat={handleCreateChat} />
                <div className={style.userList}>
                    {
                        listChats.map((chat, index) => {
                            return (
                                <div key={`user_${index}`} className={clsx(style.userList__item, { [style.userList__item_active]: activeId === chat.interlocutor?._id })} onClick={() => handleSelectChat(chat)}>
                                    <Image src={chat.interlocutor?.image || '/avatarUsers/defaultLogo.jpg'} loader={({ src }) => src} width={50} height={50} alt={`avatar_${chat.interlocutor?.nik}`} />
                                    <span className={style.userList__item__nik}>{chat.interlocutor?.nik}</span>
                                    {chat.unreadCount > 0 &&
                                        <span className={style.userList__item__badge}>{chat.unreadCount}</span>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </Settings>
        </div>
    );
}

export default Messages;