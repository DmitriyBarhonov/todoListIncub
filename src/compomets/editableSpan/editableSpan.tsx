import React from "react"
import { ChangeEvent, useEffect, useState } from "react"

type PropsType = {
    oldTitle: string
    callBack: (value: string) => void
}


export const EditableSpan = React.memo( (props: PropsType) => {

    const [edit, setEdit] = useState(false)
    const [value, setvalue] = useState(props.oldTitle)

    const setNewValue = (e: ChangeEvent<HTMLInputElement>) => {
        setvalue(e.currentTarget.value)
    }
    const updateTitle = () => {
        props.callBack(value)
    }
    const editHandler = () => {
        setEdit(!edit)
        if (edit) updateTitle()
    }

    useEffect(() => {
        setvalue(props.oldTitle)
    }, [props.oldTitle])

    
console.log('EditableSpan');


    return (
        edit
            ? <input autoFocus onBlur={editHandler} value={value} onChange={setNewValue} />
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>

    )
})