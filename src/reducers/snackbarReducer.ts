import { Reducer } from 'redux';
import produce from 'immer';
import {
    SnackbarActionTypes,
    SnackbarAction,
} from '../actions/snackbarActions';
import { Level } from '../models/level';

export interface ISnackbarState {
    open: boolean;
    message: string;
    level: Level;
}

export const initialSnackbarState: ISnackbarState = {
    open: false,
    message: '',
    level: Level.INFO,
};

export const snackbarReducer: Reducer<ISnackbarState, SnackbarAction> = (
    state = initialSnackbarState,
    action,
) => {
    return produce(state, draft => {
        switch (action.type) {
            case SnackbarActionTypes.SHOW_SNACKBAR:
                draft.open = true;
                draft.message = action.payload.message;
                draft.level = action.payload.level;
                break;

            case SnackbarActionTypes.HIDE_SNACKBAR:
                draft.open = false;
                break;
        }
    });
};
