import React from 'react';
import {render} from 'react-dom';

import '../styles/main.css'

class App extends React.Component {
    render () {
        return (
            <div>
                <p>Welcome to Robot Simulator App</p>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));