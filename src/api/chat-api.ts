let ws: WebSocket | null = null

const notifySubscribersStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}

const closeHandler = () => {
    setTimeout(createChanel, 3000)
}

const openHandler = () => notifySubscribersStatus('ready');

const errorHandler = () => notifySubscribersStatus('error');

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const createChanel = () => {
    ws?.close()
    cleanUp()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersStatus('pending')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('error', errorHandler)
}

let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessage))
}

export const chatApi = {
    start() {
        createChanel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
    },
    subscribe(event: EventsType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[event].push(callback)
        return () => {
            // @ts-ignore
            subscribers[event] = subscribers[event].filter(s => s !== callback)
        }
    },
    unsubscribe(event: EventsType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[event] = subscribers[event].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type EventsType = 'messages-received' | 'status-changed'
export type StatusType = 'pending' | 'ready' | 'error'
export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}