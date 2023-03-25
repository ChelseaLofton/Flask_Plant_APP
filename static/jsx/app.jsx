

function App () {
    return (
        <div>
            <Outlets />

            <PlantData />
            <Humidity />
            
            
            <Plant />
            
            <Sensor />
            
            <MoistureChart />
            <HumidityChart />
            <LightChart />
            {/* <ChartCarousel /> */}
            
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
