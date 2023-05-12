import { ChangeEvent, useState, KeyboardEvent } from "react"
import Button from '@mui/material/Button';


type PropsType = {
    callBack: (title: string) => void
}


export const AddItemForm = (props: PropsType) => {
    const [title, setTitle] = useState('')
    // const [error, setError] = useState<boolean>(false)

    const tasckHeandler = () => {
        const trimedTitle = title.trim()
        if (trimedTitle && !isAddBtnDisabled) {
            props.callBack(title)
            setTitle('')
        }
       
    }
    const AddTaskOnKey = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && tasckHeandler()
    const titleMaxLength = 25
    const istitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = title.length === 0 || title.length > titleMaxLength
    const setTitleHeadler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const style = { maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color: "black" }
    return (
        <>
            <input
                placeholder='Max  25 simbols' onKeyDown={AddTaskOnKey} value={title} onChange={setTitleHeadler} />
            <Button style={style} variant="contained" onClick={tasckHeandler}>+</Button>
            {istitleLengthTooLong && <div>Title is too long</div>}
        </>
    )
}