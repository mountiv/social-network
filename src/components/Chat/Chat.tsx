import {AddMessageForm} from "./AddMessageForm";
import {Messages} from "./Messages";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {startMessagesListening, stopMessagesListening} from "../../redux/ChatReducer";

export const Chat = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

