import React, { useEffect } from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { signOut } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IState } from '../../reducers';
import { Status } from '../../models/status';

export const SignOut: React.FC = props => {
    const dispatch = useDispatch();

    const status = useSelector<IState>(state => state.auth.signOut.status);

    useEffect(() => {
        dispatch(signOut());
    }, [dispatch]);

    if (status === Status.LOADING || status === Status.UNINITIALIZED) {
        return (
            <>
                <CircularProgress />
                <Typography variant="caption">Signing out</Typography>
            </>
        );
    }

    return <Redirect to="/sign-up" />;
};
