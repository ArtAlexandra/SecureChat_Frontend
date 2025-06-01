'use client';
import { changeChatById, getChatById } from '@/shared/api/chats';
import { getMe } from '@/shared/api/user';
import { IChangeInfoChat, TInfoChat } from '@/shared/config/TInfoChat';
import { TUser } from '@/shared/config/TUser';
import Settings from '@/widgets/Settings';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import FormChangeGroup from './FormChangeGroup';

function ChangeGroupPage() {
    const searchParams = useSearchParams();
    const group = searchParams?.get('group');
    const [user, setUser] = useState<TUser>();
    const [infoChat, setInfoChat] = useState<TInfoChat>();

    useEffect(() => {
        if (!group) return;
        const loadData = async () => {
            const data = await getChatById(group);
            setInfoChat(data);
            const aboutUser = await getMe();
            setUser(aboutUser);
        }
        loadData();
    }, [group]);

    const handleChangeChatInfo = async (participantIds: string[], title: string, file: File | null, id: string) => {
        const data: IChangeInfoChat = {
            title,
            participants: participantIds,
            id
        }
        await changeChatById({ data, file });
    };

    return (
        <div className="flex">
            <Settings>
                <div className="flex">
                    {user && <Image src={user.image || '/avatarUsers/defaultLogo.jpg'} loader={({ src }) => src} width={50} height={50} alt={`avatar_${user.nik}`} />}
                    {user && <p>{user.name} ({user.nik})</p>}
                </div>
            </Settings>
            {infoChat && <FormChangeGroup chatInfo={infoChat} onSave={handleChangeChatInfo} />}
        </div>
    );
}

export default ChangeGroupPage;