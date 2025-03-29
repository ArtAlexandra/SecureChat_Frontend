'use client';
import Image from "next/image";
import style from './Settings.module.scss';
function Settings() {
    return(
        <div className={style.settings}>
            <Image src="/settings/user.svg" alt="user" width={50} height={50}/>
            <Image src="/settings/message.svg" alt="message" width={50} height={50}/> 
            <Image src="/settings/setting.svg" alt="setting" width={50} height={50}/> 
        </div>
    );
}
export default Settings;