import {Message} from "./Message";
import {useAppSelector} from "../../redux/reduxStore";
import {ChatMessageAPIType} from "../../api/chat-api";
import React, {useEffect, useRef, useState} from "react";


export const Messages = () => {
    const messages = useAppSelector<ChatMessageAPIType[]>(state => state.chat.messages)
    const messagesRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false )

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return <div style={{overflowY: 'auto', height: '400px'}} onScroll={scrollHandler}>
        {messages.map((message, key) => <Message message={message} key={key}/>)}
        <div ref={messagesRef}></div>
    </div>
}