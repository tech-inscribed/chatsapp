import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './store';
import Amplify from 'aws-amplify';
import { BrowserRouter as Router } from 'react-router-dom';

Amplify.configure({
    Auth: {
        region: 'ap-south-1',
        userPoolId: 'ap-south-1_WX8nNxJgB',
        userPoolWebClientId: '7vj08t07je8ec9u1gu3r0i2ch4',
    },
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    </Provider>,
    document.getElementById('root'),
);
