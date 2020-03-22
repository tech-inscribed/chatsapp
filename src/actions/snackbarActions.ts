import { Level } from '../models/level';

export enum SnackbarActionTypes {
    SHOW_SNACKBAR = 'snackbar/show',
    HIDE_SNACKBAR = 'snackbar/hide',
}

export const showSnackbar = (
    message: string,
    level: Level,
): IShowSnackbarAction => {
    return {
        type: SnackbarActionTypes.SHOW_SNACKBAR,
        payload: {
            message,
            level,
        },
    };
};

export const hideSnackbar = (): IHideSnackbarAction => {
    return {
        type: SnackbarActionTypes.HIDE_SNACKBAR,
    };
};

export interface IShowSnackbarAction {
    type: SnackbarActionTypes.SHOW_SNACKBAR;
    payload: {
        message: string;
        level: Level;
    };
}

export interface IHideSnackbarAction {
    type: SnackbarActionTypes.HIDE_SNACKBAR;
}

export type SnackbarAction = IShowSnackbarAction | IHideSnackbarAction;
