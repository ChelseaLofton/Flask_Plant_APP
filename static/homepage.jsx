import React from 'react';
import ReactDOM from 'react-dom';


function Homepage() {
    return (
        <React.Fragment>

            <p>This is a homepage</p>

            <a href="/plants">
                Click here to view my plants.
            </a>
            <br />
            <a href="/sensors">
                Click here to view sensor information.
            </a>
            <br />
            <a href="/climate_controls">
                Click here to view sensor information.
            </a>
        </React.Fragment>
    );
}

ReactDOM.render(<Homepage />, document.getElementById('app'));
