import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {startMessagesListening, stopMessagesListening} from "../../redux/ChatReducer";
import { Messages } from "./Messages/Messages";
import { AddMessageForm } from "./AddMessageForm/AddMessageForm";

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

