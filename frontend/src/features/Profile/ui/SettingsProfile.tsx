'use client';

import Button from "@/shared/ui/Button";
import Settings from "@/widgets/Settings";
import style from './SettingsProfile.module.scss';
import { useRouter } from "next/navigation";
import ModalExit from "./ModalExit";
import { useEffect, useState } from "react";
import { getMe } from "@/shared/api/user";
import { TUser } from "@/shared/config/TUser";
import UserInfo from "./UserInfo";


function SettingsProfile() {
    const router = useRouter();
    const [showModalExit, setShowModalExit] = useState<boolean>(false);
    const [showUserInfo, setShowUserInfo] = useState<boolean>(true);
    const [user, setUser] = useState<TUser | null>(null);
    const handleSelectItem = (url: string) => {
        router.push(url);
    };

    const getUser = async () => {
        const answer = await getMe();
        setUser(answer);
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleGetUser = () => {
        getUser();
        setShowUserInfo(true);
    };

    return (
        <div className={style.settingsProfile}>
            <Settings>
                <div className={style.settingsProfile__main}>
                    <div onClick={handleGetUser} className={style.settingsProfile__item}>Мой профиль</div>
                    <div onClick={() => handleSelectItem("/")} className={style.settingsProfile__item}>Оформление</div>
                    <Button color="error" onClick={() => setShowModalExit(true)} className={style.settingsProfile__button}>Выход</Button>
                </div>
            </Settings>

            {showUserInfo && user && <UserInfo user={user} />}
            <ModalExit isOpen={showModalExit} onClose={() => setShowModalExit(false)} />
        </div>
    );
}

export default SettingsProfile;