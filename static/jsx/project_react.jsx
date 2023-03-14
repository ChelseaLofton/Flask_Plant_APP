function GenerateSensorButtons() {
    const [sensorIds, setSensorIds] = React.useState([]);

    React.useEffect(() => {
        const url = '/sensors.json'
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSensorIds(data);
            });
    }, []);

    const handleSensorClick = (sensorId) => {
        console.log(sensorId);
        const url = `/sensors/${sensorId}.json`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const sensor_battery = data.battery;
                const sensor_conductivity = data.conductivity;
                const sensor_illuminance = data.illuminance;
                const sensor_moisture = data.moisture;
                const sensor_temperature = data.temperature;
                const sensorDataElement = document.getElementById('#sensor_data')
                if(sensorDataElement) {
                    sensorDataElement.innerHTML = `Battery: ${sensor_battery}%, 
                    Conductivity: ${sensor_conductivity}, Illuminance: ${sensor_illuminance} lux, 
                    Moisture: ${sensor_moisture}%, Temperature: ${sensor_temperature} °F`;
                }
                });
    };

    return (
        React.createElement("div", {id: "sensor-ids"},
            sensorIds.map((sensorID) =>
            React.createElement("button", {
                key: `sensor-${sensorID}`,
                id: `sensors=${sensorID}-button`,
                onClick: () => handleSensorClick(sensorID)
            }, `Sensor ${sensorID}`)
        )
        )
    );
}



ReactDOM.render(React.createElement(GenerateSensorButtons), document.getElementById('sensor-ids'))




