import { ChangeEvent, useEffect, useState } from "react"

type PropsType = {
    oldTitle: string
    callBack: (value: string) => void
}


export const EditableSpan = (props: PropsType) => {

useEffect(()=>{
    setvalue(props.oldTitle)
},[props.oldTitle])
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



    return (
        edit
            ? <input autoFocus onBlur={editHandler} value={value} onChange={setNewValue} />
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>

    )
}