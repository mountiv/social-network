import {Button} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessage} from "../../redux/ChatReducer";

export const AddMessageForm = () => {
    const [message, setMessage] = useState('')
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
        <Button onClick={sendMessageHandler}>Send</Button>
    </div>
}