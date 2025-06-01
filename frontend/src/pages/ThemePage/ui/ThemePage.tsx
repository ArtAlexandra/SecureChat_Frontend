'use client';
import { useState } from "react";
import style from './ThemePage.module.scss';
import clsx from "clsx";
import Settings from "@/widgets/Settings";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/Routes";
import Button from "@/shared/ui/Button";
import ModalExit from "./ModalExit";
import useTheme from "@/shared/providers/useTheme";


function ThemePage() {
    const { toggleTheme } = useTheme();
    const router = useRouter();
    const [showModalExit, setShowModalExit] = useState<boolean>(false);

    const handleSelectItem = (url: string) => {
        router.push(url);
    };

    return (
        <div className={style.themePage}>
            <Settings>
                <div className={style.themePage__main}>
                    <div onClick={() => handleSelectItem(ROUTES.settings.profile)} className={style['themePage__main-item']}>Мой профиль</div>
                    <div onClick={() => handleSelectItem(ROUTES.settings.theme)} className={style['themePage__main-item']}>Оформление</div>
                    <Button color="error" onClick={() => setShowModalExit(true)} className={style['themePage__main-button']}>Выход</Button>
                </div>
            </Settings>
            <div className={style.themePage__form}>
                <p>Тема</p>
                <div className="flex">
                    <div className={clsx(style.circle, style.circle_pink)} onClick={() => toggleTheme('pink')}></div>
                    <div className={clsx(style.circle, style.circle_green)} onClick={() => toggleTheme('green')}></div>
                    <div className={clsx(style.circle, style.circle_blue)} onClick={() => toggleTheme('blue')}></div>
                </div>
            </div>
            <ModalExit isOpen={showModalExit} onClose={() => setShowModalExit(false)} />
        </div>
    );
}

export default ThemePage;