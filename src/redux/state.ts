export type postDataType = {
    id: number
    message: string
    likeCounts: number
}

export type dialogsDataType = {
    id: number
    name: string
}

export type messageDataType = {
    id: number
    message: string
}

export type  dialogsPageType = {
    dialogsData: Array<dialogsDataType>
    messageData: Array<messageDataType>
}

export type profilePageType = {
    postsData: Array<postDataType>
    newPostText: string
}

type sideBarType = {}

export type RootStateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
    sideBar: sideBarType
}

export type StoreType = {
    _state: RootStateType
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsType) => void
}

export type ActionsType = AddPostActionType | ChangeNewTextActionType;

type AddPostActionType = {
    type: "ADD-POST"
    postText: string
}

type ChangeNewTextActionType = {
    type: "CHANGE-NEW-TEXT"
    newText: string
}

export const store: StoreType = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'Hey, I like you', likeCounts: 13},
                {id: 2, message: 'I like it-kamasutra', likeCounts: 139}
            ],
            newPostText: ''
        }
        ,
        dialogsPage: {
            dialogsData: [
                {id: 1, name: 'Viktor'},
                {id: 2, name: 'Vlad'},
                {id: 3, name: 'Kristina'},
                {id: 4, name: 'Lera'},
                {id: 5, name: 'Sergey'},
                {id: 6, name: 'Oliver'},
            ],

            messageData: [
                {id: 1, message: 'Hey, baby'},
                {id: 2, message: 'I miss you'},
                {id: 3, message: 'Cool'},
                {id: 4, message: 'I like it'},
                {id: 5, message: 'I like it-kamasutra'}
            ]
        },
        sideBar: {},
    },
    _onChange() {
        console.log('State changed')
    },
    subscribe(callback) {
        this._onChange = callback
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        if (action.type === "ADD-POST") {
            let newPost = {
                id: new Date().getTime(),
                message: action.postText,
                likeCounts: 0
            };
            this._state.profilePage.postsData.push(newPost)
            this._onChange()
        } else if (action.type === "CHANGE-NEW-TEXT") {
            this._state.profilePage.newPostText = action.newText
            this._onChange()
        }
    }
}







