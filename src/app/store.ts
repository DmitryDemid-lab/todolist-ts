import {tasksReducer, todolistsReducer} from '../features/TodolistsList';
import {combineReducers} from 'redux';
import thunkMiddleware from "redux-thunk";
import {authReducer} from "../features/Auth";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "../features/Application";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

// непосредственно создаём store
export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
    }
)
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

