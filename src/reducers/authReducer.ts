import { AuthAction, AuthActionTypes } from '../actions/authActions';
import { Status } from '../models/status';
import produce from 'immer';
import { Reducer } from 'redux';
import { IUserDetails } from '../models/userDetails';

export interface IAuthState {
    check: {
        status: Status;
    };
    signUp: {
        status: Status;
    };
    confirm: {
        status: Status;
        username: string;
        destination: string;
    };
    signIn: {
        status: Status;
    };
    signOut: {
        status: Status;
    };
    userDetails?: IUserDetails;
}

export const initialAuthState: IAuthState = {
    check: {
        status: Status.LOADING,
    },
    signUp: {
        status: Status.UNINITIALIZED,
    },
    confirm: {
        status: Status.UNINITIALIZED,
        username: '',
        destination: '',
    },
    signIn: {
        status: Status.UNINITIALIZED,
    },
    signOut: {
        status: Status.UNINITIALIZED,
    },
};

export const authReducer: Reducer<IAuthState, AuthAction> = (
    state = initialAuthState,
    action,
) => {
    return produce(state, draft => {
        switch (action.type) {
            case AuthActionTypes.CHECK_AUTH:
                draft.check.status = Status.LOADING;
                break;

            case AuthActionTypes.CHECK_AUTH_SUCCESS:
                draft.check.status = Status.SUCCESS;
                draft.userDetails = action.payload.userDetails;
                break;

            case AuthActionTypes.CHECK_AUTH_FAILURE:
                draft.check.status = Status.FAILURE;
                break;

            case AuthActionTypes.SIGN_UP:
                draft.signUp.status = Status.LOADING;
                draft.confirm.username = action.payload.username;
                break;

            case AuthActionTypes.SIGN_UP_SUCCESS:
                draft.signUp.status = Status.SUCCESS;
                draft.confirm.destination = action.payload.destination;
                break;

            case AuthActionTypes.SIGN_UP_FAILURE:
                draft.signUp.status = Status.FAILURE;
                break;

            case AuthActionTypes.CONFIRM:
                draft.confirm.status = Status.LOADING;
                break;

            case AuthActionTypes.CONFIRM_SUCCESS:
                draft.confirm.status = Status.SUCCESS;
                break;

            case AuthActionTypes.CONFIRM_FAILURE:
                draft.confirm.status = Status.FAILURE;
                break;

            case AuthActionTypes.SIGN_IN:
                draft.signIn.status = Status.LOADING;
                break;

            case AuthActionTypes.SIGN_IN_SUCCESS:
                draft.signIn.status = Status.SUCCESS;
                break;

            case AuthActionTypes.SIGN_IN_FAILURE:
                draft.signIn.status = Status.FAILURE;
                break;

            case AuthActionTypes.SIGN_OUT:
                draft.signOut.status = Status.LOADING;
                break;

            case AuthActionTypes.SIGN_OUT_SUCCESS:
                draft.signOut.status = Status.SUCCESS;
                draft.signIn.status = Status.UNINITIALIZED;
                draft.signUp.status = Status.UNINITIALIZED;
                draft.confirm.status = Status.UNINITIALIZED;
                break;

            case AuthActionTypes.SIGN_OUT_FAILURE:
                draft.signOut.status = Status.FAILURE;
                break;
        }
    });
};
