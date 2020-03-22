import React from 'react';
import { Auth } from '../Auth/Auth';
import { makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router';
import { SignUp } from '../Auth/SignUp';
import { SignIn } from '../Auth/SignIn';
import { Confirm } from '../Auth/Confirm';
import { Home } from '../Home/Home';
import { SignOut } from '../Auth/SignOut';
import { Snackbars } from '../Snackbars/Snackbars';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            padding: 0,
            margin: 0,
            height: '100vh',
            width: '100vw',
            background: theme.palette.background.default,
        },
        '#root': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: 'inherit',
            width: 'inherit',
        },
    },
}));

export const App: React.FC = props => {
    useStyles();

    return (
        <>
            <Switch>
                <Route path="/sign-up" component={SignUp} />
                <Route path="/confirm" component={Confirm} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-out" component={SignOut} />
                <Route
                    path="/"
                    render={() => (
                        <Auth>
                            <Home />
                        </Auth>
                    )}
                />
            </Switch>
            <Snackbars />
        </>
    );
};
