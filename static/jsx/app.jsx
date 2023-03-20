
function App () {
    return (
        <div>

            <GenerateHumidityButtons />
            <PlantButtons />
            <GenerateSensorButtons  />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
