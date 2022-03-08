import s from './../Dialogs.module.css'
import {Link} from "react-router-dom";

type DialogItemType = {
    name: string,
    id: number
}

export const DialogItem = (props: DialogItemType) => {
    let path = '/dialogs/' + props.id;
    return (
        < div className={s.dialog + ' ' + s.active}>
            <Link to={path}> {props.name} </Link>
        </div>
    )
}

