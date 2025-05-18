'use client';
import SelectedUser from "@/features/SelectedUser";
import ListChats from "@/features/ListChats";
import { useEffect, useState } from "react";
import type { TChat, TPopulatedUser } from "@/shared/config/ChatType";
import { getAllChats } from "@/shared/api/chats";
import { useUnread } from "@/shared/contexts/UnreadContext";

function HomePage() {
    const [chats, setChats] = useState<TChat[]>([]);
    const [selectedUser, setSelectedUser] = useState<TPopulatedUser>(chats[0]?.interlocutor);
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

    const handleSelectChat = async (user: TPopulatedUser, chatId: string) => {
        const allChats = await getAllChats();
        setChats(allChats);
        await refreshUnreadCount();
        setSelectedUser(user);
        setSelectedChatId(chatId);
    };

    return (
        <div className="flex">
            <ListChats chats={chats} onSelect={handleSelectChat} activeId={selectedUser?._id} />
            <SelectedUser userId={selectedUser?._id} chatId={selectedChatId} />
        </div>
    );
}
export default HomePage;