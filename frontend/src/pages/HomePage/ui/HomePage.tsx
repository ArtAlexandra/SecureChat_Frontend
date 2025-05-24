'use client';
import SelectedUser from "@/features/SelectedUser";
import ListChats from "@/features/ListChats";
import { useEffect, useState } from "react";
import type { TChat, TPopulatedUser } from "@/shared/config/ChatType";
import { getAllChats } from "@/shared/api/chats";
import { useUnread } from "@/shared/contexts/UnreadContext";
import style from './HomePage.module.scss';

function HomePage() {
    const [chats, setChats] = useState<TChat[]>([]);
    const [selectedUser, setSelectedUser] = useState<TPopulatedUser| null>(null);
    const [selectedChatId, setSelectedChatId] = useState<string>('');
    const { refreshUnreadCount } = useUnread();

    useEffect(() => {
        const getData = async () => {
            const allChats = await getAllChats();
            setChats(allChats);
            await refreshUnreadCount();
        };

        getData();
    }, []);

    const handleSelectChat = async (chatId: string) => {
        const allChats = await getAllChats();
        setChats(allChats);
        await refreshUnreadCount();
        setSelectedChatId(chatId);
    };

    const handleUpdateList = async () => {
        const allChats = await getAllChats();
        setChats(allChats);
        setSelectedUser(null);
        setSelectedChatId('');
    };

    return (
        <div className={style.homePage}>
            <ListChats chats={chats} onSelect={handleSelectChat} activeId={selectedUser?._id} />
            {selectedChatId && <SelectedUser chatId={selectedChatId} onUpdateList={handleUpdateList}/>}
        </div>
    );
}
export default HomePage;