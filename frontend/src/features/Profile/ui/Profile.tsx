'use client';

import SettingsProfile from "./SettingsProfile";

function Profile() {
    const handleExit = () => {

    };
    return(
        <>
            <SettingsProfile onExit={handleExit} onSelect={handleExit}/>
        </>
    );
}

export default Profile;