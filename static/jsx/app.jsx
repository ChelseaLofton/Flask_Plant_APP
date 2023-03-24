

function App () {
    return (
        <div>
            <PlantData />
            <Plant />
            <Humidity />
            <Sensor />
            <Outlets />
            <MoistureChart />
            <HumidityChart />
            <LightChart />
            
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
