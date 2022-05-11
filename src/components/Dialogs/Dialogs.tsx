import s from './Dialogs.module.css'
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import React from "react";
import {DialogsType} from "./DialogsContainer";
import {Link} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {Textarea} from "../common/formsControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators";

const maxLength50 = maxLengthCreator(50)

export const Dialogs = (props: DialogsType) => {

    const addNewMessage = (values:{ newMessage: string }) => {
        props.addMessage(values.newMessage)
    }

    let dialogsElement = props.dialogsData
        .map(d => <DialogItem name={d.name} id={d.id}/>)
    let messageElement = props.messageData
        .map(m => <Message message={m.message}/>)


    if (!props.isAuth) return <Link to='/login'/>
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messageElement}
            </div>
            <AddMessageReduxForm onSubmit={addNewMessage}/>
        </div>
    )
}

const AddMessageForm: React.FC<InjectedFormProps<{ newMessage: string }>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field
            component={Textarea}
            name={'newMessage'}
            placeholder={'Enter your message'}
            validate={[required, maxLength50]}
        />
        <button>Send message</button>
    </form>
}

const AddMessageReduxForm = reduxForm<{ newMessage: string }>({
    form: 'dialogAddMessageForm'
})(AddMessageForm)