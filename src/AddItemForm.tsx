import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from '@material-ui/icons';


type AddItemFormPropsType = {
    addItem: (title: string) => void,
}

function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
        } else {
            setError("Field is required!")
        }
        setTitle("");
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem()
        }
    };

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={"title"}
                helperText={error}
            />
            <IconButton
                onClick={addItem}
                color={"primary"}
            >
                <AddBox />
            </IconButton>
        </div>
    )
}

export default AddItemForm;