'use client';

import Button from "@/shared/ui/Button";
import Settings from "@/widgets/Settings";

interface ISettingsProfileProps {
    onExit: () => void;
    onSelect: () => void;
};

function SettingsProfile({ onSelect, onExit }: ISettingsProfileProps) {
    return (
        <Settings>
            <div>
                <div onClick={onSelect}>Мой профиль</div>
                <div onClick={onSelect}>Оформление</div>
                <Button color="error" onClick={onExit}>Выход</Button>
            </div>
        </Settings>
    );
}

export default SettingsProfile;