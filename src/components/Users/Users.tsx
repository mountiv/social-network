import s from "./Users.module.css"
import {UsersPropsType} from "./UsersContainer";
/*

type UsersPropsType = {
    users: Array<UsersType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
}

*/
export const Users = (props: UsersPropsType) => {

    props.users.length === 0 && props.setUsers([
        {
            id: 1,
            photoUrl: 'https://png.pngtree.com/png-clipart/20200224/original/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_5233396.jpg',
            followed: true,
            fullName: 'Nastya',
            status: 'I want to be alone',
            location: {country: 'Belarus', city: 'Minsk'}
        },
        {
            id: 2,
            photoUrl: 'https://png.pngtree.com/png-clipart/20200224/original/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_5233396.jpg',
            followed: true,
            fullName: 'Katya',
            status: 'I want to be free',
            location: {country: 'Belarus', city: 'Minsk'}
        },
        {
            id: 3,
            photoUrl: 'https://png.pngtree.com/png-clipart/20200224/original/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_5233396.jpg',
            followed: false,
            fullName: 'Vlad',
            status: 'I want to be rich',
            location: {country: 'Belarus', city: 'Minsk'}
        },
        {
            id: 4,
            photoUrl: 'https://png.pngtree.com/png-clipart/20200224/original/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_5233396.jpg',
            followed: false,
            fullName: 'Jack',
            status: 'I want to be awesome',
            location: {country: 'Belarus', city: 'Minsk'}
        }
    ])

    return <div>
        {props.users.map(u =>
            <div key={u.id}>
                <span>
                    <div><img alt={'ava'} src={u.photoUrl} className={s.avatar}/></div>
                    <div>{u.followed
                        ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
                        : <button onClick={() => props.follow(u.id)}>Follow</button>}</div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                     </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                     </span>
                </span>
            </div>)}
    </div>
}