import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {startMessagesListening, stopMessagesListening} from "../../redux/ChatReducer";
import { Messages } from "./Messages/Messages";
import { AddMessageForm } from "./AddMessageForm/AddMessageForm";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxStore";

export const Chat = () => {
    const dispatch = useDispatch()
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    if (!isAuth) return <Navigate to={'/login'} replace={true}/>
    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

