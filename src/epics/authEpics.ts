import { Epic, combineEpics } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { Auth } from 'aws-amplify';
import {
    AuthAction,
    AuthActionTypes,
    checkAuthSuccess,
    checkAuthFailure,
    signUpSuccess,
    signUpFailure,
    signInSuccess,
    signInFailure,
    confirmSuccess,
    confirmFailure,
    signOutSuccess,
    signOutFailure,
} from '../actions/authActions';
import { IState } from '../reducers';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Action } from 'redux';

const checkAuthEpic: Epic<AuthAction, AuthAction, IState> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.CHECK_AUTH)),
        mergeMap(() =>
            from(Auth.currentAuthenticatedUser()).pipe(
                map(response => checkAuthSuccess(response)),
                catchError(() => of(checkAuthFailure())),
            ),
        ),
    );

const signUpEpic: Epic<AuthAction, AuthAction, IState> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.SIGN_UP)),
        mergeMap(action =>
            from(
                Auth.signUp({
                    username: action.payload.username,
                    password: action.payload.password,
                    attributes: {
                        name: action.payload.name,
                    },
                }),
            ).pipe(
                map(response =>
                    signUpSuccess(response.codeDeliveryDetails.Destination),
                ),
                catchError(e => of(signUpFailure(e.code, e.message))),
            ),
        ),
    );

const confirmEpic: Epic<AuthAction, AuthAction, IState> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.CONFIRM)),
        mergeMap(action =>
            from(
                Auth.confirmSignUp(
                    state$.value.auth.confirm.username,
                    action.payload.code,
                ),
            ).pipe(
                map(response => confirmSuccess()),
                catchError(e => of(confirmFailure(e.code, e.message))),
            ),
        ),
    );

const signInEpic: Epic<AuthAction, Action, IState> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.SIGN_IN)),
        mergeMap(action =>
            from(
                Auth.signIn({
                    username: action.payload.username,
                    password: action.payload.password,
                }),
            ).pipe(
                map(response => signInSuccess()),
                catchError(e => of(signInFailure(e.code, e.message))),
            ),
        ),
    );

const signOutEpic: Epic<AuthAction, AuthAction, IState> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(AuthActionTypes.SIGN_OUT)),
        mergeMap(action =>
            from(Auth.signOut()).pipe(
                map(response => signOutSuccess()),
                catchError(() => of(signOutFailure())),
            ),
        ),
    );

export const authEpics = combineEpics(
    checkAuthEpic,
    signUpEpic,
    confirmEpic,
    signInEpic,
    signOutEpic,
);
