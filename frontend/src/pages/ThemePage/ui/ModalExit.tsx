'use client';
import { ROUTES } from "@/shared/config/Routes";
import Button from "@/shared/ui/Button";
import Modal from "@/shared/ui/Modal";
import { useRouter } from "next/navigation";

interface IModalExitProps {
    isOpen: boolean;
    onClose: () => void;
};

function ModalExit({ isOpen, onClose }: IModalExitProps) {
    const router = useRouter();

    const handleExit = () => {
        localStorage.removeItem('securechat_token');
        router.push(ROUTES.auth.signin);
    };

    return (
        <Modal title="" isOpen={isOpen} onCancel={onClose} size="small">
            <p className="text-xl font-bold text-center">Вы уверены?</p>
            <div className="flex gap-3.5 justify-center">
                <Button color="secondary" onClick={onClose}>Отмена</Button>
                <Button color="error" onClick={handleExit}>Выйти</Button>
            </div>
        </Modal>
    );
}

export default ModalExit;