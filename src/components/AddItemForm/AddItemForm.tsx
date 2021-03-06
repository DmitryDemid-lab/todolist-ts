import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from '@material-ui/icons';

export type AddItemFormSubmitHelpersType = {
    setError: (error: string) => void
    setTitle: (title: string) => void
}
type AddItemFormPropsType = {
    addItem: (title: string, helper: AddItemFormSubmitHelpersType) => void,
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = async () => {
        if (title.trim() !== "") {
            addItem(title, {setError, setTitle})
        } else {
            setError("Field is required!")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler()
        }
    }

    return (
        <div onBlur={() => setError(null)}>
            <TextField
                disabled={disabled}
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={"Title"}
                helperText={error}
            />
            <IconButton
                disabled={disabled}
                onClick={addItemHandler}
                color={"primary"}
                style={{marginLeft: '7px'}}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})