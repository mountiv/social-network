type ContactsType = {
    contactTitle: string
    contactValue: string | null
}

export const Contact = (props: ContactsType) => {
    return (
        <div>
            <b>{props.contactTitle}: </b>
            {props.contactValue}
        </div>
    )
}