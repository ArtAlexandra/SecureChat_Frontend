'use client';
import { TMessage } from "@/shared/config/MessagesType";
import { TUser } from "@/shared/config/TUser";
import Image from "next/image";
import style from './SelectedUser.module.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import WriteMessage from "@/shared/ui/WriteMessage";

interface ISelectedUseProps {
    userId: string;
};

function SelectedUser({ userId }: ISelectedUseProps) {
    const [user, setUser] = useState<TUser>();
    const [messages, setMessages] = useState<TMessage[]>([]);

    const handleSendMessage = (message: string) => {
        console.log(message);
    };

    useEffect(() => {
        if (!userId) return;
        axios.get(`/messages/get-message/${userId}`, {
            headers: {
                'Authorization': localStorage.getItem('securechat_token')
            }
        })
            .then((res) => {
                setMessages(res.data)
            })
            .catch((error) => {
                console.error(error)
            })


        axios.get(`/users/select-id/${userId}`, {
            headers: {
                'Authorization': localStorage.getItem('securechat_token')
            }
        })
            .then((res) => {
                setUser(res.data)
            })
            .catch((error) => {
                console.error(error)
            })

    }, [userId])

    return (
        <div className={style.selected}>
            <div className={style.selected__header}>
                <p>{user?.nik}</p>
            </div>
            <div>
                {messages.map((message, index) => {
                    return (
                        <div key={`mes_${index}`} className={style.selected__message}>
                            {message.content}
                            {message.fileUrl &&
                                <Image src={message.fileUrl} loader={({ src }) => src} alt="image_user" width={300} height={400} />
                            }
                        </div>
                    )
                })}
                <WriteMessage onSubmit={handleSendMessage}/>
            </div>
        </div>
    );
}
export default SelectedUser;