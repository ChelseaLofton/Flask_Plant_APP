function App () {
    return (
        <div>
            <Plant />
            <Humidity />
            <Sensor />
            <Outlets />
            <MoistureChart />
            <HumidityChart />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
