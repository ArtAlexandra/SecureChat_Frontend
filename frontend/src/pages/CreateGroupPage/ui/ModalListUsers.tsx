import { getAllUsers } from "@/shared/api/user";
import { TUser } from "@/shared/config/TUser";
import Button from "@/shared/ui/Button";
import Modal from "@/shared/ui/Modal";
import { useEffect, useState } from "react";

interface IModalListUsersProps {
    selectedUsers?: TUser[];
    isOpen: boolean;

    onClose: () => void;
    onSelect: (users: TUser[]) => void;
};

function ModalListUsers({ selectedUsers, isOpen, onClose, onSelect }: IModalListUsersProps) {
    const [users, setUsers] = useState<TUser[] | undefined>(selectedUsers);
    const [selectedUsersList, setSelectedUsersList] = useState<TUser[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await getAllUsers();
            setUsers(data);
        };
        loadData();
    }, []);
    return (
        <Modal isOpen={isOpen} onCancel={onClose}>
            {users && <>

                {users.map((user, index) => {
                    return (
                        <div key={index}>
                            <p>{user.name} ({user.nik})</p>
                            <Button onClick={() => setSelectedUsersList((prev) => [...prev, user])}>Выбрать</Button>
                        </div>
                    )
                })}
                <Button onClick={() => onSelect(selectedUsersList)}>Добавить {selectedUsersList?.length} пользователей</Button>
            </>}
        </Modal>
    );
}

export default ModalListUsers;