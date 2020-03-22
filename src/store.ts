import { createStore, applyMiddleware, Action } from "redux";
import { rootReducer, initialState, IState } from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import { epicMiddleware, rootEpic } from "./epics";

const composeEnhancer = composeWithDevTools({
    name: 'Chatsapp'
});

export const store = createStore<IState, Action, any, any>(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);