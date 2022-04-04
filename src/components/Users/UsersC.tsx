import s from "./Users.module.css"
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import React from "react";
import userPhoto from "../../assets/images/userPhoto.png"
import {UsersState, UsersType} from "../../redux/UsersPageReducer";

type UsersResponse = {
    items: UsersType[]
    totalCount?: number
    error?: string | null
}

class UsersC extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios.get<UsersResponse>('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        console.log(this.props.users)
        return <div>
            {this.props.users.map((u =>
                <div key={u.id}>
                <span>
                    <div><img alt={'ava'} src={u.photos.small !== null ? u.photos.small : userPhoto}
                              className={s.avatar}/></div>
                    <div>{u.followed
                        ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                        : <button onClick={() => this.props.follow(u.id)}>Follow</button>}</div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                     </span>
                    <span>
                        <div>{'location.country'}</div>
                        <div>{'location.city'}</div>
                     </span>
                </span>
                </div>))}
        </div>
    }
}

export default UsersC
