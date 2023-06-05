import { Checkbox } from "@mui/material";
import React from "react";
import { ChangeEvent } from "react";


type TypeChekBox ={
    callBack: (e:boolean)=> void
    checked: boolean
}
export const SuperCheckBox = React.memo( (props:TypeChekBox) => {


    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>)=>{
        props.callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox
            checked={props.checked}
            color="primary"
            onChange={onChangeHandler}
        />
    );
})