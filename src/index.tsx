import {store} from './redux/reduxStore'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


export const renderTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <div><App store={store}/>
            </div>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

store.subscribe(renderTree)
renderTree()







