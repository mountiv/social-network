import {Message} from "./Message";
import {useAppSelector} from "../../redux/reduxStore";
import {ChatMessageType} from "../../api/chat-api";
import {useEffect, useRef, useState} from "react";


export const Messages = () => {
    const messages = useAppSelector<ChatMessageType[]>(state => state.chat.messages)
    const messagesRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    useEffect(() => {
        if (isAutoScroll) {
            messagesRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return <div>
        {messages.map((message, key) => <Message message={message} key={key}/>)}
    </div>
}