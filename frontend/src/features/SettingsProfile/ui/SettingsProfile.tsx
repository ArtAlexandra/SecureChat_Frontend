'use client';

import Button from "@/shared/ui/Button";
import Settings from "@/widgets/Settings";
import style from './SettingsProfile.module.scss';
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/Routes";


function SettingsProfile() {
    const router = useRouter();

    const handleSelectItem = (url: string) => {
        router.push(url);
    };

    const handleExit = () => {
        router.replace(ROUTES.auth.signin);
    };

    return (
        <Settings>
            <div className={style.settingsProfile}>
                <div onClick={() => handleSelectItem("/")} className={style.settingsProfile__item}>Мой профиль</div>
                <div onClick={() => handleSelectItem("/")} className={style.settingsProfile__item}>Оформление</div>
                <Button color="error" onClick={handleExit} className={style.settingsProfile__button}>Выход</Button>
            </div>
        </Settings>
    );
}

export default SettingsProfile;