import {Message} from "./Message";
import {useAppSelector} from "../../redux/reduxStore";
import {ChatMessageType} from "../../api/chat-api";


export const Messages = () => {
    const messages = useAppSelector<ChatMessageType[]>(state => state.chat.messages)

    return <div>
        {messages.map((message, key) => <Message message={message} key={key}/>)}
    </div>
}