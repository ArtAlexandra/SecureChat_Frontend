'use client';
import SelectedUser from "@/widgets/SelectedUser";
import Messages from "@/widgets/Messages";
import { useEffect, useState } from "react";
import type { TChat, TPopulatedUser } from "@/shared/config/ChatType";
import { getAllChats } from "../api/getAllChats";

function HomePage() {
    const [chats, setChats] = useState<TChat[]>([]);

    useEffect(() => {
        const getData = async() => {
            const allChats = await getAllChats();
            setChats(allChats);
        };

        getData();
    }, []);

    const [selectedUser, setSelectedUser] = useState<TPopulatedUser>(chats[0]?.interlocutor);

    return (
        <div className="flex">
            <Messages chats={chats} onSelect={setSelectedUser} activeId={selectedUser?._id}/>
            <SelectedUser userId={selectedUser?._id} />
        </div>
    );
}
export default HomePage;