'use client';
import { TMessage } from "@/shared/config/MessagesType";
import { TUser } from "@/shared/config/TUser";
import SelectedUser from "@/shared/ui/SelectedUser";
import Messages from "@/widgets/Messages";
import { useState } from "react";
const users: TUser[] = [
    {
        id: '12331231',
        nik: 'Петрова Екатерина',
        avatar: '/avatarUsers/user1.jpg'
    },
    {
        id: '1233122311',
        nik: 'Сидоров Михаил',
        avatar: '/avatarUsers/user2.jpg'
    },
    {
        id: '123312323211',
        nik: 'Иванов Александр',
        avatar: '/avatarUsers/user3.png'
    },
    {
        id: '12331231',
        nik: 'Смирнов Артём',
        avatar: '/avatarUsers/user1.jpg'
    },
    {
        id: '1233122311',
        nik: 'Кузнецова София',
        avatar: '/avatarUsers/user2.jpg'
    },
    {
        id: '123312323211',
        nik: 'Звягинцева Анастасия',
        avatar: '/avatarUsers/user3.png'
    },
    {
        id: '12331231',
        nik: 'Петрова Екатерина',
        avatar: '/avatarUsers/user1.jpg'
    },
    {
        id: '1233122311',
        nik: 'Сидоров Михаил',
        avatar: '/avatarUsers/user2.jpg'
    },
    {
        id: '123312323211',
        nik: 'Иванов Александр',
        avatar: '/avatarUsers/user3.png'
    },
    {
        id: '12331231',
        nik: 'Смирнов Артём',
        avatar: '/avatarUsers/user1.jpg'
    },
    {
        id: '1233122311',
        nik: 'Кузнецова София',
        avatar: '/avatarUsers/user2.jpg'
    },
    {
        id: '123312323211',
        nik: 'Звягинцева Анастасия',
        avatar: '/avatarUsers/user3.png'
    }
];

const messages: TMessage[] = [
    {
        id: '12333242',
        authorId: '12331231',
        authorName: 'Петрова Екатерина',
        value:'Привет!'
    },
    {
        id: '12333242',
        authorId: '12331231',
        authorName: 'Петрова Екатерина',
        value:'Как дела?'
    },
    {
        id: '12333242',
        authorId: '12331231',
        authorName: 'Петрова Екатерина',
        value:'Что нового?'
    },
    {
        id: '12333242',
        authorId: '12331231',
        authorName: 'Петрова Екатерина',
        value:'У меня появился котик',
        image: '/cat.svg'
    },
]
function HomePage() {
    const [selectedUser, setSelectedUser] = useState<TUser>(users[0]);
    return(
        <div className="flex">
         <Messages users={users} onSelect={(user)=>setSelectedUser(user)}/>
         <SelectedUser user={selectedUser} messages={messages}/>
        </div>
    );
}
export default HomePage;