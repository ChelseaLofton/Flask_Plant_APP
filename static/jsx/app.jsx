
function App () {
    return (
        <div>

            <GenerateHumidityButtons />
            <Plant />
            <Sensor  />
            <DisplayOutletStates />

        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
