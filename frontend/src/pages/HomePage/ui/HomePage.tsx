'use client';
import { TUser } from "@/shared/config/TUser";
import SelectedUser from "@/widgets/SelectedUser";
import Messages from "@/widgets/Messages";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
    const [users, setUsers] = useState<TUser[]>([]);
    useEffect(() => {
        axios.get('/users/get-all', {
            headers: {
                'Authorization': localStorage.getItem('securechat_token')
            }
        })
            .then((res) => {
                setUsers(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    const [selectedUser, setSelectedUser] = useState<TUser>(users[0]);

    return (
        <div className="flex">
            <Messages users={users} onSelect={(user) => setSelectedUser(user)} activeId={selectedUser?._id}/>
            <SelectedUser userId={selectedUser?._id} />
        </div>
    );
}
export default HomePage;