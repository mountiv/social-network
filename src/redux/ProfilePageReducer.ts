import {ActionsType, profilePageType} from "./state";

export const AddPostAC = (postText: string) => ({
    type: "ADD-POST",
    postText: postText
} as const)

export const ChangeNewTextAC = (newText: string) => ({
    type: "CHANGE-NEW-TEXT",
    newText: newText
} as const)

export const ProfilePageReducer = (state: profilePageType, action: ActionsType) => {
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