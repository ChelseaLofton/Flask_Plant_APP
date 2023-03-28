/**
 * 
 * Libraries: React
 * Components: SensorModal, SensorButton, Sensor
 */


// SensorModal component displays live sensor readings in a modal
const SensorModal = (props) => {
    const { sensorData, showModal, associatedPlantId, selectedSensorId, handleClose } = props;
    const displayName = associatedPlantId ? associatedPlantId.slice(0, -3) : '';

    return (
        <div className={`modal fade ${showModal ? "show" : ""}`} tabIndex="-1" aria-hidden={!showModal} style={{ display: showModal ? "block" : "none" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Sensor {selectedSensorId}: {displayName}</h2>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {sensorData && (
                            <div id="plant-sensor-data">
                                <h3>Live Sensor Readings</h3>
                                <ul style={{listStyleType: "disc"}}>
                                    <li>Moisture: {sensorData.moisture}%</li>
                                    <li>Temperature: {sensorData.temperature}°F</li>
                                    <li>Illuminance: {sensorData.illuminance}lux</li>
                                    <li>Conductivity: {sensorData.conductivity}</li>
                                    <li>Battery: {sensorData.battery}%</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


// SensorButton component renders individual sensor buttons
const SensorButton = (props) => {
    return (
        <div>
            <button
                key={`sensor-${props.id}`}
                id={`sensor=${props.id}-button`}
                className="sensor-button"
                onClick={() => props.onClick(props.id)}
            >
                Sensor {props.id}
            </button>
        </div>
    );
};


function Sensor() {
    const [sensorIds, setSensorIds] = React.useState([]);
    const [sensorData, setSensorData] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedSensorId, setSelectedSensorId] = React.useState(null);
    const [associatedPlantId, setAssociatedPlantId] = React.useState(null);

    // Fetch sensor IDs 
    React.useEffect(() => {
        const url = '/sensors.json';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSensorIds(data);
            });
    }, []);

    // Fetch sensor data when sensor button is clicked
    const handleSensorClick = (sensorId) => {
        fetch(`/sensors/${sensorId}.json`)
            .then((response) => response.json())
            .then((data) => {
                setSensorData(data.sensor_readings);
                setShowModal(true);
                setSelectedSensorId(sensorId);
                setAssociatedPlantId(data.plant_id);
            });
    };

    // Close modal when user clicks "x" button
    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <React.Fragment>
            <div id="sensor-ids">
                {sensorIds.map((sensorID) => (
                    <SensorButton id={sensorID} onClick={handleSensorClick} />
                ))}
            </div>
            <SensorModal
                sensorData={sensorData}
                selectedSensorId={selectedSensorId}
                associatedPlantId={associatedPlantId}
                showModal={showModal}
                handleClose={handleClose}
            />

        </React.Fragment>
    );
}