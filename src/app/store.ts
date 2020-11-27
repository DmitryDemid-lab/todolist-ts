import {tasksReducer} from '../features/TodolistsList/taskReducer/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolistReducer/todolists-reducer';
import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux';
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./appReducer/app-reducer";
import {authReducer} from "../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {action} from "@storybook/addon-actions";
import {useMemo} from "react";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export type RootReducerType = typeof rootReducer

// непосредственно создаём store
export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
    }
)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject<any>> (actions: T) {
    const dispatch = useDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}