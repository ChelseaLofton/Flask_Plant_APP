

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
        React.createElement("div", { id: "outlet-ids" },
            Object.keys(outlets).map((outletID) => {
                const switches = outlets[outletID];
                return (
                    React.createElement("div", { key: outletID },
                        React.createElement("p", null, `Outlet ${outletID}:`),
                        Object.keys(switches).map((switchID) => {
                            const switchState = switches[switchID] ? 'on' : 'off';
                            return (
                                React.createElement("div", { key: switchID },
                                    React.createElement("label", { htmlFor: `outlet_${outletID}_${switchID}` }, `Switch ${switchID}:`),
                                    React.createElement("button", {
                                        id: `${outletID}_${switchID}`,
                                        className: `switch ${switchState}`,
                                        onClick: (evt) => toggleOutletState(outletID, switchID, evt.target)
                                    }, switchState)
                                )
                            );
                        })
                    )
                );
            })
        )
    );
};