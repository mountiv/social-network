import {Message} from "./Message";
import {useEffect, useState} from "react";
import {ChatMessageType} from "./ChatPage";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export const Messages = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        ws.addEventListener('message', (e) =>
                setMessages(JSON.parse(e.data)))
    }, [])
    return <div>
        {messages.map((message, key) => <Message message={message} key={key}/>)}
    </div>
}