import { Checkbox } from "@mui/material";
import React from "react";
import { ChangeEvent } from "react";
import { TaskStatus } from "../../api/todolist-api";


type TypeChekBox = {
    callBack: (e: boolean) => void
    checked: TaskStatus
}
export const SuperCheckBox = React.memo((props: TypeChekBox) => {
    const checked = props.checked === TaskStatus.Completed

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox
            checked={checked}
            color="primary"
            onChange={onChangeHandler}
        />
    );
})