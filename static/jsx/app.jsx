
function App () {
    return (
        <div>

            <GenerateHumidityButtons />
            <PlantButtons />
            <GenerateSensorButtons  />
            <DisplayOutletStates />

        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
