import { combineReducers, Action } from 'redux';
import { authReducer, IAuthState, initialAuthState } from './authReducer';
import {
    ISnackbarState,
    initialSnackbarState,
    snackbarReducer,
} from './snackbarReducer';

export interface IState {
    auth: IAuthState;
    snackbars: ISnackbarState;
}

export const initialState: IState = {
    auth: initialAuthState,
    snackbars: initialSnackbarState,
};

export const rootReducer = combineReducers<IState, Action>({
    auth: authReducer,
    snackbars: snackbarReducer,
});
