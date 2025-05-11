'use client';
import SelectedUser from "@/features/SelectedUser";
import ListChats from "@/features/ListChats";
import { useEffect, useState } from "react";
import type { TChat, TPopulatedUser } from "@/shared/config/ChatType";
import { getAllChats } from "@/shared/api/chats";

function HomePage() {
    const [chats, setChats] = useState<TChat[]>([]);
    const [selectedUser, setSelectedUser] = useState<TPopulatedUser>(chats[0]?.interlocutor);
    const [selectedChatId, setSelectedChatId] = useState<string>('');

    useEffect(() => {
        const getData = async() => {
            console.log(1)
            const allChats = await getAllChats();
            console.log(allChats)
            setChats(allChats);
        };

        getData();
    }, []);

    const handleSelectChat = (user: TPopulatedUser, chatId: string) => {
        setSelectedUser(user);
        setSelectedChatId(chatId);
    };

    return (
        <div className="flex">
            <ListChats chats={chats} onSelect={handleSelectChat} activeId={selectedUser?._id}/>
            <SelectedUser userId={selectedUser?._id} chatId={selectedChatId}/>
        </div>
    );
}
export default HomePage;