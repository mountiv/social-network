import {Chat} from "./Chat";
import {useEffect} from "react";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}



const ChatPage = () => {

    return <>
        <Chat/>
    </>
}

export default ChatPage