

function DisplayOutletStates() {
    const [outlets, setOutlets] = useState([]);

    React.useEffect(() => {
        const url = '/outlets.json';

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setOutlets(data);
            });
    }, []);

    const toggleOutletState = (outletID, switchID, switchButton) => {
        const url = `/outlets/${outletID}/${switchID}/.json`;
        const currentState = switchButton.innerText;
        const newState = currentState === 'on' ? 'off' : 'on';

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
            });
    };

    return (
        <div id="outlet-ids">
            {Object.keys(outlets).map((outletID) => {
                const switches = outlets[outletID];
                return (
                    <div key={outletID}>
                        <p>Outlet {outletID}:</p>
                        {Object.keys(switches).map((switchID) => {
                            const switchState = switches[switchID] ? 'on' : 'off';
                            return (
                                <div key={switchID}>
                                    <label htmlFor={`outlet_${outletID}_${switchID}`}>
                                        Switch {switchID}:
                                    </label>
                                    <button
                                        id={`${outletID}_${switchID}`}
                                        className={`switch ${switchState}`}
                                        onClick={(evt) =>
                                            toggleOutletState(outletID, switchID, evt.target)
                                        }
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
}

export default DisplayOutletStates;





ReactDOM.render(
    React.createElement(DisplayOutletStates),
    document.getElementById('outlet-ids')
);




<script type="module">
    import DisplayOutletStates from '/static/jsx/outlets.jsx';
    ReactDOM.render(
        React.createElement(DisplayOutletStates),
        document.getElementById('outlet-ids')
    );
    </script>



// return React.createElement("div", { id: "outlet-ids" },
//     Object.keys(outlets).map((outletID) => {
//         const switches = outlets[outletID];
//         return React.createElement("div", { key: outletID },
//             React.createElement("p", null, `Outlet ${outletID}:`),
//             Object.keys(switches).map((switchID) => {
//                 const switchState = switches[switchID] ? 'on' : 'off';
//                 return React.createElement("div", { key: switchID },
//                     React.createElement("label", { htmlFor: `outlet_${outletID}_${switchID}` }, `Switch ${switchID}:`),
//                     React.createElement("button", {
//                         id: `${outletID}_${switchID}`,
//                         className: `switch ${switchState}`,
//                         onClick: (evt) => toggleOutletState(outletID, switchID, evt.target)
//                     }, switchState));
//             }));
//     })
// );
