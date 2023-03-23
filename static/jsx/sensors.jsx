const SensorButton = (props) => {
    // console.log(props);
    return (
        <React.Fragment>
            <div>
                <button
                    key={`sensor-${props.id}`}
                    id={`sensors=${props.id}-button`}
                    onClick={() => props.onClick(props.id)}
                >
                    Sensor {props.id}
                </button>
            </div>
        </React.Fragment>
    );
};

function Sensor() {
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
                // console.log(sensorId);
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
                        <SensorButton key={sensorID} id={sensorID} onClick={handleSensorClick} />
                    ))}
                </div>
                        <div>
                            <h4>Current Sensor Readings</h4>
                            {sensorData && <div id="sensor-data">
                                Moisture: {sensorData.moisture}%;
                                Temperature: {sensorData.temperature} °F;
                                Illuminance: {sensorData.illuminance} lux;
                                Conductivity: {sensorData.conductivity};
                                Battery: {sensorData.battery}%;
                            </div>}
                        </div>
        </React.Fragment>
            );
};









