'use client';

import Image from "next/image";
import Settings from "@/widgets/Settings";
import FormCreateGroup from './FormCreateGroup';
import { useEffect, useState } from "react";
import { TUser } from "@/shared/config/TUser";
import { getMe } from "@/shared/api/user";

function CreateGroupPage() {
    const [user, setUser] = useState<TUser>();

    useEffect(() => {
        const loadData = async () => {
            const data = await getMe();
            setUser(data);
        };
        loadData();
    }, [])
    return (
        <div className="flex">
            <Settings>
                <div className="flex">
                    {user && <Image src={user.image || '/avatarUsers/defaultLogo.jpg'} loader={({ src }) => src} width={50} height={50} alt={`avatar_${user.nik}`} />}
                    {user && <p>{user.name} ({user.nik})</p>}
                </div>
            </Settings>
            <FormCreateGroup />
        </div>
    );
}

export default CreateGroupPage;