import { ChangeEvent, useState, KeyboardEvent } from "react"
import Button from '@mui/material/Button';
import React from "react";
import { RequestStatusType } from "../../app/appReducer";


export type AddItemFromPropsType = {
    disabled?: boolean
    callBack: (title: string) => void
}


export const AddItemForm = React.memo((props: AddItemFromPropsType) => {
    const [title, setTitle] = useState('')
    const titleMaxLength = 25
    // const istitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = title.length === 0 || title.length > titleMaxLength
    const style = { maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color: "black" }


    const tasckHeandler = () => {
        const trimedTitle = title.trim()
        // if (trimedTitle && !isAddBtnDisabled){
        //     props.callBack(title) 
        //     setTitle('')
        // }

        props.callBack(title)
        setTitle('')
    }

    const AddTaskOnKey = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && tasckHeandler()
    const setTitleHeadler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        <>
            <input disabled={props.disabled} placeholder='Max  25 simbols' onKeyDown={AddTaskOnKey} value={title} onChange={setTitleHeadler} />
            <Button disabled={props.disabled} style={style} variant="contained" onClick={tasckHeandler}>+</Button>
            {/* {istitleLengthTooLong && <div>Title is too long</div>} */}
        </>
    )
}) 