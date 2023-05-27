import { Checkbox } from "@mui/material";
import { ChangeEvent } from "react";


type TypeChekBox ={
    callBack: (e:boolean)=> void
    checked: boolean
}
export const SuperCheckBox = (props:TypeChekBox) => {


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
};