'use client';
import SelectedUser from "@/widgets/SelectedUser";
import Messages from "@/widgets/Messages";
import { useEffect, useState } from "react";
import type { TChat, TPopulatedUser } from "@/shared/config/ChatType";
import { getAllChats } from "../api/getAllChats";

function HomePage() {
    const [chats, setChats] = useState<TChat[]>([]);
    const [selectedUser, setSelectedUser] = useState<TPopulatedUser>(chats[0]?.interlocutor);
    const [selectedChatId, setSelectedChatId] = useState<string>('');

    useEffect(() => {
        const getData = async() => {
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
            <Messages chats={chats} onSelect={handleSelectChat} activeId={selectedUser?._id}/>
            <SelectedUser userId={selectedUser?._id} chatId={selectedChatId}/>
        </div>
    );
}
export default HomePage;