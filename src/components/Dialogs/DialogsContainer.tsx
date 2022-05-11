import React, {ComponentType} from "react";
import {AddDialogMessageAC} from "../../redux/DialogsPageReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {RootStateType} from "../../redux/reduxStore";
import {withAuthRedirect} from "../common/WithAuthRedirect/WithAuthRedirect";

type mapStatePropsType = {
    dialogsData: Array<{ id: number, name: string }>
    messageData: Array<{ id: number, message: string }>
    isAuth: boolean
}

type mapDispatchPropsType = {
    addMessage: (value: string) => void
}

export type DialogsType = mapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state: RootStateType): mapStatePropsType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messageData: state.dialogsPage.messageData,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        addMessage: (text: string) => {
            dispatch(AddDialogMessageAC(text))
        }
    }
}

export default compose<ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)