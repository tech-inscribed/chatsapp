import { IUserDetails } from '../models/userDetails';

export enum AuthActionTypes {
    CHECK_AUTH = 'auth/check',
    CHECK_AUTH_SUCCESS = 'auth/checkSuccess',
    CHECK_AUTH_FAILURE = 'auth/checkFailure',

    SIGN_UP = 'auth/signUp',
    SIGN_UP_SUCCESS = 'auth/signUpSuccess',
    SIGN_UP_FAILURE = 'auth/signUpFailure',

    CONFIRM = 'auth/confirm',
    CONFIRM_SUCCESS = 'auth/confirmSuccess',
    CONFIRM_FAILURE = 'auth/confirmFailure',

    SIGN_IN = 'auth/signIn',
    SIGN_IN_SUCCESS = 'auth/signInSuccess',
    SIGN_IN_FAILURE = 'auth/signInFailure',

    SIGN_OUT = 'auth/signOut',
    SIGN_OUT_SUCCESS = 'auth/signOutSuccess',
    SIGN_OUT_FAILURE = 'auth/signOutFailure',
}

export const checkAuth = (): ICheckAuthAction => {
    return {
        type: AuthActionTypes.CHECK_AUTH,
    };
};

export const checkAuthSuccess = (
    userDetails: IUserDetails,
): ICheckAuthSuccessAction => {
    return {
        type: AuthActionTypes.CHECK_AUTH_SUCCESS,
        payload: {
            userDetails,
        },
    };
};

export const checkAuthFailure = (): ICheckAuthFailureAction => {
    return {
        type: AuthActionTypes.CHECK_AUTH_FAILURE,
    };
};

export const signUp = (
    name: string,
    username: string,
    password: string,
): ISignUpAction => {
    return {
        type: AuthActionTypes.SIGN_UP,
        payload: {
            name,
            username,
            password,
        },
    };
};

export const signUpSuccess = (destination: string): ISignUpSuccessAction => {
    return {
        type: AuthActionTypes.SIGN_UP_SUCCESS,
        payload: {
            destination,
        },
    };
};

export const signUpFailure = (
    code: string,
    message: string,
): ISignUpFailureAction => {
    return {
        type: AuthActionTypes.SIGN_UP_FAILURE,
        payload: {
            code,
            message,
        },
    };
};

export const confirm = (code: string): IConfirmAction => {
    return {
        type: AuthActionTypes.CONFIRM,
        payload: {
            code,
        },
    };
};

export const confirmSuccess = (): IConfirmSuccessAction => {
    return {
        type: AuthActionTypes.CONFIRM_SUCCESS,
    };
};

export const confirmFailure = (
    code: string,
    message: string,
): IConfirmFailureAction => {
    return {
        type: AuthActionTypes.CONFIRM_FAILURE,
        payload: {
            code,
            message,
        },
    };
};

export const signIn = (username: string, password: string): ISignInAction => {
    return {
        type: AuthActionTypes.SIGN_IN,
        payload: {
            username,
            password,
        },
    };
};

export const signInSuccess = (): ISignInSuccessAction => {
    return {
        type: AuthActionTypes.SIGN_IN_SUCCESS,
    };
};

export const signInFailure = (
    code: string,
    message: string,
): ISignInFailureAction => {
    return {
        type: AuthActionTypes.SIGN_IN_FAILURE,
        payload: {
            code,
            message,
        },
    };
};

export const signOut = (): ISignOutAction => {
    return {
        type: AuthActionTypes.SIGN_OUT,
    };
};

export const signOutSuccess = (): ISignOutSuccessAction => {
    return {
        type: AuthActionTypes.SIGN_OUT_SUCCESS,
    };
};

export const signOutFailure = (): ISignOutFailureAction => {
    return {
        type: AuthActionTypes.SIGN_OUT_FAILURE,
    };
};

export interface ICheckAuthAction {
    type: AuthActionTypes.CHECK_AUTH;
}

export interface ICheckAuthSuccessAction {
    type: AuthActionTypes.CHECK_AUTH_SUCCESS;
    payload: {
        userDetails: IUserDetails;
    };
}

export interface ICheckAuthFailureAction {
    type: AuthActionTypes.CHECK_AUTH_FAILURE;
}

export interface ISignUpAction {
    type: AuthActionTypes.SIGN_UP;
    payload: {
        name: string;
        username: string;
        password: string;
    };
}

export interface ISignUpSuccessAction {
    type: AuthActionTypes.SIGN_UP_SUCCESS;
    payload: {
        destination: string;
    };
}

export interface ISignUpFailureAction {
    type: AuthActionTypes.SIGN_UP_FAILURE;
    payload: {
        code: string;
        message: string;
    };
}

export interface IConfirmAction {
    type: AuthActionTypes.CONFIRM;
    payload: {
        code: string;
    };
}

export interface IConfirmSuccessAction {
    type: AuthActionTypes.CONFIRM_SUCCESS;
}

export interface IConfirmFailureAction {
    type: AuthActionTypes.CONFIRM_FAILURE;
    payload: {
        code: string;
        message: string;
    };
}

export interface ISignInAction {
    type: AuthActionTypes.SIGN_IN;
    payload: {
        username: string;
        password: string;
    };
}

export interface ISignInSuccessAction {
    type: AuthActionTypes.SIGN_IN_SUCCESS;
}

export interface ISignInFailureAction {
    type: AuthActionTypes.SIGN_IN_FAILURE;
    payload: {
        code: string;
        message: string;
    };
}

export interface ISignOutAction {
    type: AuthActionTypes.SIGN_OUT;
}

export interface ISignOutSuccessAction {
    type: AuthActionTypes.SIGN_OUT_SUCCESS;
}

export interface ISignOutFailureAction {
    type: AuthActionTypes.SIGN_OUT_FAILURE;
}

export type AuthAction =
    | ICheckAuthAction
    | ICheckAuthSuccessAction
    | ICheckAuthFailureAction
    | ISignUpAction
    | ISignUpSuccessAction
    | ISignUpFailureAction
    | IConfirmAction
    | IConfirmSuccessAction
    | IConfirmFailureAction
    | ISignInAction
    | ISignInSuccessAction
    | ISignInFailureAction
    | ISignOutAction
    | ISignOutSuccessAction
    | ISignOutFailureAction;
