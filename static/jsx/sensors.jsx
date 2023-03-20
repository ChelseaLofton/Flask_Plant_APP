function GenerateSensorButtons() {
    const [sensorIds, setSensorIds] = React.useState([]);
    const [sensorData, setSensorData] = React.useState(null);

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
                setSensorData(data);
            });
    };


    return (
        <React.Fragment>
            <h2> Sensor Data</h2>
            <div id="sensor-ids">
                {sensorIds.map((sensorID) => (
                    <div>
                        <button
                            key={`sensor-${sensorID}`}
                            id={`sensors=${sensorID}-button`}
                            onClick={() => handleSensorClick(sensorID)}
                        >
                            Sensor {sensorID}
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <h2>Current Sensor Readings</h2>
                {sensorData && <div id="sensor-data">
                    Battery: {sensorData.battery}%;
                    Conductivity: {sensorData.conductivity};
                    Illuminance: {sensorData.illuminance} lux;
                    Moisture: {sensorData.moisture}%;
                    Temperature: {sensorData.temperature} °F;
                </div>}
            </div>
        </React.Fragment>
    );
};
