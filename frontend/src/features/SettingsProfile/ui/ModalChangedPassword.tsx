import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Modal from "@/shared/ui/Modal";
import { useEffect, useState } from "react";

interface IModalChangedPasswordProps {
    isOpen: boolean;
    error: string;
    onCancel: () => void;
    onChange: (value: string) => void;
};

function ModalChangedPassword({ isOpen, error, onCancel, onChange }: IModalChangedPasswordProps) {
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (isOpen) return;
        setPassword('');
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onCancel={onCancel} onClose={onCancel}>
            <p className="text-sm font-bold text-center text-red-500">{error}</p>
            <p className="text-xl font-bold text-center">Новый пароль</p>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="flex justify-center mt-4">
                <Button onClick={() => onChange(password)}>Сохранить</Button>
            </div>
        </Modal>
    );
}

export default ModalChangedPassword;