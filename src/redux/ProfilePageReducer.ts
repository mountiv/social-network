import {ActionsType, profilePageType} from "./state";

export const AddPostAC = (postText: string) => ({
    type: "ADD-POST",
    postText: postText
} as const)

export const ChangeNewTextAC = (newText: string) => ({
    type: "CHANGE-NEW-TEXT",
    newText: newText
} as const)

let initialState: profilePageType = {
    postsData: [
        {id: 1, message: 'Hey, I like you', likeCounts: 13},
        {id: 2, message: 'I like it-kamasutra', likeCounts: 139}
    ],
    newPostText: ''
}

export const ProfilePageReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "ADD-POST":
            let newPost = {
                id: new Date().getTime(),
                message: action.postText,
                likeCounts: 0
            };
            state.postsData.push(newPost)
            return state;
        case "CHANGE-NEW-TEXT":
            state.newPostText = action.newText
            return state;
        default:
            return state
    }
}