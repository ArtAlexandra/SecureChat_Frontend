'use client';

import Image from "next/image";
import style from "./Settings.module.scss";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/Routes";

interface ISettingsProps {
    children: React.ReactNode;
};

function Settings({children}: ISettingsProps) {
    const router = useRouter();

    return (
        <div className={style.settings}>
            {children}
            <div className={style.settings__icons}>
                <Image src="/settings/user.svg" alt="user" width={30} height={30} onClick={() => router.replace(ROUTES.settings.profile)} />
                <Image src="/settings/message.svg" alt="message" width={30} height={30} onClick={() => router.replace(ROUTES.message.main)} />
                <Image src="/settings/setting.svg" alt="setting" width={30} height={30} onClick={() => router.replace(ROUTES.settings.profile)} />
            </div>
        </div>
    );
}
export default Settings;