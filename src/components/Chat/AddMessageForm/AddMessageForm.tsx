import {Button, TextField} from "@mui/material";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessage} from "../../../redux/ChatReducer";
import {useAppSelector} from "../../../redux/reduxStore";
import s from "./AddMessageForm.module.css"


export const AddMessageForm = () => {
    const [message, setMessage] = useState('')
    const status = useAppSelector(state => state.chat.status)
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (message) {
            dispatch(sendMessage(message))
            setMessage('')
        }
    }

    const onKeyEventHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            sendMessageHandler()
        }
    }

    return <div className={s.containerForm}>
        <TextField placeholder={'Enter your message'}
                   style={{maxWidth: 400}}
                   value={message}
                   onKeyPress={onKeyEventHandler}
                   onChange={(e) => setMessage(e.currentTarget.value)}/>
        <Button className={s.button} variant="contained" disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
    </div>
}