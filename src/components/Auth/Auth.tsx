import React, { useEffect } from 'react';
import { checkAuth } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../reducers';
import { Status } from '../../models/status';
import { CircularProgress, Typography } from '@material-ui/core';
import { Redirect } from 'react-router';

export const Auth: React.FC = props => {
    const dispatch = useDispatch();

    const status = useSelector<IState, Status>(
        state => state.auth.check.status,
    );

    useEffect(() => {
        const timeout = setTimeout(() => dispatch(checkAuth()), 2000);
        return () => clearTimeout(timeout);
    }, [dispatch]);

    if (status === Status.LOADING) {
        return (
            <>
                <CircularProgress />
                <Typography variant="caption">Authenticating</Typography>
            </>
        );
    }

    if (status === Status.FAILURE) {
        return <Redirect to="/sign-up" />;
    }

    return <>{props.children}</>;
};
