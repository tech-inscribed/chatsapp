import { Epic, combineEpics } from 'redux-observable';
import { Action } from 'redux';
import { SnackbarAction, showSnackbar } from '../actions/snackbarActions';
import { IState } from '../reducers';
import { filter, mapTo, map } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { AuthActionTypes, AuthAction } from '../actions/authActions';
import { Level } from '../models/level';

const signUpSuccessEpic: Epic<Action, SnackbarAction, IState> = (
    action$,
    state$,
) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.SIGN_UP_SUCCESS)),
        mapTo(
            showSnackbar(
                'Account created successfully. Please confirm your account.',
                Level.INFO,
            ),
        ),
    );

const signUpFailureEpic: Epic<AuthAction, Action, IState> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.SIGN_UP_FAILURE)),
        map(action => showSnackbar(action.payload.message, Level.INFO)),
    );

const confirmSuccessEpic: Epic<Action, SnackbarAction, IState> = (
    action$,
    state$,
) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.CONFIRM_SUCCESS)),
        mapTo(showSnackbar('Account confirmed successfully', Level.INFO)),
    );

const confirmFailureEpic: Epic<AuthAction, Action, IState> = (
    action$,
    state$,
) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.CONFIRM_FAILURE)),
        map(action => showSnackbar(action.payload.message, Level.INFO)),
    );

const signInSuccessEpic: Epic<Action, SnackbarAction, IState> = (
    action$,
    state$,
) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.SIGN_IN_SUCCESS)),
        mapTo(showSnackbar('Signed in successfully', Level.INFO)),
    );

const signInFailureEpic: Epic<AuthAction, Action, IState> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.SIGN_IN_FAILURE)),
        map(action => showSnackbar(action.payload.message, Level.INFO)),
    );

const signOutSuccessEpic: Epic<Action, SnackbarAction, IState> = (
    action$,
    state$,
) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.SIGN_OUT_SUCCESS)),
        mapTo(showSnackbar('Signed out successfully', Level.INFO)),
    );

export const snackbarEpics = combineEpics(
    signUpSuccessEpic,
    signUpFailureEpic,
    confirmSuccessEpic,
    confirmFailureEpic,
    signInSuccessEpic,
    signInFailureEpic,
    signOutSuccessEpic,
);
