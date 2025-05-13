'use client';

import Button from "@/shared/ui/Button";
import Settings from "@/widgets/Settings";
import style from './SettingsProfile.module.scss';
import { useRouter } from "next/navigation";
import ModalExit from "./ModalExit";
import { useState } from "react";


function SettingsProfile() {
    const router = useRouter();
    const [showModalExit, setShowModalExit] = useState<boolean>(false);
    const handleSelectItem = (url: string) => {
        router.push(url);
    };

    return (
        <Settings>
            <ModalExit isOpen={showModalExit} onClose={() => setShowModalExit(false)} />
            <div className={style.settingsProfile}>
                <div onClick={() => handleSelectItem("/")} className={style.settingsProfile__item}>Мой профиль</div>
                <div onClick={() => handleSelectItem("/")} className={style.settingsProfile__item}>Оформление</div>
                <Button color="error" onClick={() => setShowModalExit(true)} className={style.settingsProfile__button}>Выход</Button>
            </div>
        </Settings>
    );
}

export default SettingsProfile;