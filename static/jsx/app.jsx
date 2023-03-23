
function App () {
    return (
        <div>

            <Plant />
            <Humidity />
            <Sensor  />
            <Outlets />
            <HumidityData />

        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
