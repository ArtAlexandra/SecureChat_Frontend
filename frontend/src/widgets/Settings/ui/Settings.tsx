'use client';

import Image from "next/image";
import style from "./Settings.module.scss";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/Routes";
import { useUnread } from "@/shared/contexts/UnreadContext";
import { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import clsx from "clsx";

interface ISettingsProps {
    children: React.ReactNode;
};

function Settings({ children }: ISettingsProps) {
    const router = useRouter();
    const { unreadCount } = useUnread();
    const [isMobile, setIsMobile] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Проверяем при загрузке
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    return (
        <div className={style.settings}>
            {/* Кнопка меню для мобильных */}
            {isMobile && (
                <button 
                    onClick={togglePanel}
                    className={style.settings__menuButton}
                >
                    <MenuOutlined />
                </button>
            )}

            {/* Левая панель */}
            <div className={clsx(
                style.settings__leftPanel,
                isMobile && style.settings__leftPanel_mobile,
                isMobile && isPanelOpen && style.settings__leftPanel_open
            )}>
                {children}
            </div>

            {/* Иконки внизу */}
            <div className={style.settings__icons}>
                <Image
                    src="/settings/user.svg"
                    alt="user"
                    width={30}
                    height={30}
                    onClick={() => router.replace(ROUTES.settings.createGroup)}
                    className={style.settings__icon}
                />
                <div className={style.settings__notificationContainer}>
                    {unreadCount > 0 && (
                        <div className={style.settings__notificationContainer__badge}>
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </div>
                    )}
                    <Image
                        src="/settings/message.svg"
                        alt="message"
                        width={30}
                        height={30}
                        onClick={() => router.replace(ROUTES.message.main)}
                        className={style.settings__icon}
                    />
                </div>
                <Image
                    src="/settings/setting.svg"
                    alt="setting"
                    width={30}
                    height={30}
                    onClick={() => router.replace(ROUTES.settings.profile)}
                    className={style.settings__icon}
                />
            </div>
        </div>
    );
}

export default Settings;