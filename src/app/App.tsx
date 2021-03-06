import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {TodolistsList} from "../features/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {Route} from 'react-router-dom';
import {authActions, authSelectors, Login} from "../features/Auth";
import {appActions} from "../features/Application";
import {selectIsInitialized, selectStatus} from "../features/Application/selectors";
import {useActions} from "../utils/reduxUtils";

type AppPropsType = {
    demo?: boolean
}

export const App = React.memo(({demo = false, ...props}: AppPropsType) => {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        initializeApp()
    }, [])

    const logoutHandler = useCallback(() => logout(), [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return <div className="App">
        <AppBar position="static">
            <ErrorSnackbar/>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6">
                    ToDo-Lists
                </Typography>
                {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
        <Container fixed>
            <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
            <Route path={'/login'} render={() => <Login/>}/>
        </Container>
    </div>
})