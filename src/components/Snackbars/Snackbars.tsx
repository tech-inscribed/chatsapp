import React from 'react';
import { Snackbar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../reducers';
import { hideSnackbar } from '../../actions/snackbarActions';

export const Snackbars: React.FC = props => {
    const dispatch = useDispatch();

    const open = useSelector<IState, boolean>(state => state.snackbars.open);
    const message = useSelector<IState, string>(
        state => state.snackbars.message,
    );

    const onClose = (e: React.SyntheticEvent, r: string) => {
        if (r === 'clickaway') {
            return;
        }
        dispatch(hideSnackbar());
    };

    return (
        <Snackbar
            open={open}
            message={message}
            autoHideDuration={5000}
            onClose={onClose}
        ></Snackbar>
    );
};
