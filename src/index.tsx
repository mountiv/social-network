import {store} from './redux/reduxStore'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {lime, purple} from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: purple,
        secondary: {
            main: '#ea80fc',
        },
    },
});

export const renderTree = () => {
    ReactDOM.render(
        <HashRouter>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </ThemeProvider>
        </HashRouter>,
        document.getElementById('root')
    );
}
renderTree()







