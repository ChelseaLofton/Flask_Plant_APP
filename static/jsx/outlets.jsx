// import App from './app.jsx';

const DisplayOutletStates = () => {
    const [outlets, setOutlets] = React.useState([]);

    React.useEffect(() => {
        const url = '/outlets.json';

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setOutlets(data);
            });
    }, []);

    const toggleOutletState = (outletID, switchID, switchButton) => {
        const url = `/outlets/${outletID}/${switchID}.json`;
        const currentState = switchButton.innerText;
        const newState = currentState === 'on' ? 'off' : 'on';
        console.log(url)
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ state: newState }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                const { state: newState } = data;
                switchButton.innerText = newState;

                if (newState === 'on') {
                    switchButton.classList.remove('off');
                    switchButton.classList.add('on');
                } else {
                    switchButton.classList.remove('on');
                    switchButton.classList.add('off');
                }
            })
            .catch((error) => {
                console.error(error);
                error.response.json().then((responseData) => {
                    console.log('Error Response:', responseData);
                });
            });
    };

    return (
        <div id="outlet-ids">
            {Object.keys(outlets).map(outletID => {
                const switches = outlets[outletID];
                return (
                    <div key={outletID}>
                        <p>Outlet {outletID}:</p>
                        {Object.keys(switches).map(switchID => {
                            const switchState = switches[switchID] ? 'on' : 'off';
                            return (
                                <div key={switchID}>
                                    <label htmlFor={`outlet_${outletID}_${switchID}`}>Switch {switchID}:</label>
                                    <button
                                        id={`${outletID}_${switchID}`}
                                        className={`switch ${switchState}`}
                                        onClick={evt => toggleOutletState(outletID, switchID, evt.target)}
                                    >
                                        {switchState}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

// export default DisplayOutletStates;

ReactDOM.render(<DisplayOutletStates />, document.getElementById('outlet-ids'));