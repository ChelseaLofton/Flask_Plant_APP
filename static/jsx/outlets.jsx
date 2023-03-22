function DisplayOutletStates() {
    const [outlets, setOutlets] = React.useState([]);

    const [outletState, setOutletState] = React.useState([]);     

    React.useEffect(() => {
        fetch('/outlets.json')
            .then((response) => response.json())
            .then((data) => {
                setOutlets(data);
            });
    }, []);

    const toggleOutletState = (outletID, switchID, switchButton) => {
        const currentState = switchButton.innerText;
        const newState = currentState === 'on' ? 'off' : 'on';
        fetch((`/outlets/${outletID}/${switchID}.json`), {
            method: 'POST',
            body: JSON.stringify({ state: newState }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(outlets);
                const copy = JSON.parse(JSON.stringify(outlets)); // Make a copy without linking
                copy[outletID][switchID] = data.state;
                console.log(copy);
                setOutlets(copy)
            })
            .catch((error) => {
                console.error(error);
                error.response.json().then((responseData) => {
                    console.log('Error Response:', responseData);
                });
            });
    };

    return (
        <React.Fragment>
        <h2> Outlet States</h2>
        <div id="outlet-ids">
            {Object.keys(outlets).map(outletID => {
                const switches = outlets[outletID];
                return (
                    <div key={outletID}>
                        <p>Outlet {outletID}:</p>
                        {Object.keys(switches).map(switchID => {
                            const switchState = switches[switchID]
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
        </React.Fragment>
    );
};
