'use client';
import Image from "next/image";
import style from './Settings.module.scss';
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/Routes";
function Settings() {
    const router = useRouter();

    return(
        <div className={style.settings}>
            <Image src="/settings/user.svg" alt="user" width={50} height={50} onClick={()=>router.replace(ROUTES.settings.profile)}/>
            <Image src="/settings/message.svg" alt="message" width={50} height={50} onClick={()=>router.replace(ROUTES.message.main)}/> 
            <Image src="/settings/setting.svg" alt="setting" width={50} height={50} onClick={()=>router.replace(ROUTES.settings.profile)}/> 
        </div>
    );
}
export default Settings;