
function GenerateSensorButtons() {
    const [sensorIds, setSensorIds] = React.useState([]);

    React.useEffect(() => {
        const url = '/sensors.json';
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
                const sensorDataElement = document.getElementById('sensor-data');
                if (sensorDataElement) {
                    sensorDataElement.innerHTML = `Battery: ${sensor_battery}%, 
            Conductivity: ${sensor_conductivity}, Illuminance: ${sensor_illuminance} lux, 
            Moisture: ${sensor_moisture}%, Temperature: ${sensor_temperature} °F`;
                }
            });
    };

    const sensorButtons = sensorIds.map((sensorID) => (
        <button
            key={`sensor-${sensorID}`}
            id={`sensors=${sensorID}-button`}
            onClick={() => handleSensorClick(sensorID)}
        >
            Sensor {sensorID}
        </button>
    ));

    return (
        <div id="sensor-ids">
            {sensorButtons}
        </div>
    );
}


ReactDOM.render(<GenerateSensorButtons />, document.getElementById('sensor-ids'));












