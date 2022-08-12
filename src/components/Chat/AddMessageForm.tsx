import {Button} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessage} from "../../redux/ChatReducer";
import {useAppSelector} from "../../redux/reduxStore";

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

    return <div>
        <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}>
        </textarea>
        <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
    </div>
}