import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { authEpics } from './authEpics';
import { IState } from '../reducers';
import { Action } from 'redux';
import { snackbarEpics } from './snackbarEpics';

export const rootEpic = combineEpics<Action, Action, IState>(
    authEpics,
    snackbarEpics,
);

export const epicMiddleware = createEpicMiddleware<Action, Action, IState>();
