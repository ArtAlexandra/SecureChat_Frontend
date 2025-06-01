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
    const [users, setUsers] = useState<TUser[]>([]);
    const [selectedUsersList, setSelectedUsersList] = useState<TUser[]>(selectedUsers || []);

    useEffect(() => {
        const loadData = async () => {
            let data = await getAllUsers();
            if (selectedUsers) {
                data = data.filter(item =>
                    !selectedUsers.some(selected => selected._id === item._id)
                )
            }

            setUsers(data);
        };
        loadData();
    }, []);

    const handleAddUsers = () => {
        onSelect(selectedUsersList);
        onClose();
    };

    const handleSelectUser = (user: TUser) => {
        setSelectedUsersList((prev) => [...prev, user]);
        const filtersData = users?.filter(item => item._id !== user._id);
        setUsers(filtersData);
    };

    const handleRemoveUser = (user: TUser) => {
        const filtersData = selectedUsersList?.filter(item => item._id !== user._id);
        if (filtersData) {
            setSelectedUsersList(filtersData);
        }
        else {
            setSelectedUsersList([]);
        }
        setUsers((prev) => [...prev, user]);
    };

    return (
        <Modal isOpen={isOpen} onCancel={onClose} size="big">
            {users && <div className="flex justify-center">
                <div>
                    <h3>Список пользователей</h3>
                    {users.map((user, index) => {
                        return (
                            <div key={index} className="flex mb-4">
                                <p className="mr-4">{user.name} ({user.nik})</p>
                                <Button onClick={() => handleSelectUser(user)}>Выбрать</Button>
                            </div>
                        )
                    })}
                    <Button onClick={handleAddUsers}>Добавить {selectedUsersList?.length} пользователей</Button>
                </div>
                <div>
                    <h3>Выбранные пользователи</h3>
                    {selectedUsersList?.map((user, index) => {
                        return (
                            <div key={index} className="flex mb-4">
                                <p className="mr-4">{user.name} ({user.nik})</p>
                                <Button onClick={() => handleRemoveUser(user)}>Удалить</Button>
                            </div>
                        )
                    })}
                </div>
            </div>}
        </Modal>
    );
}

export default ModalListUsers;