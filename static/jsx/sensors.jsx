const SensorModal = (props) => {
    const { sensorData, showModal, selectedSensorId, handleClose } = props;

    return (
        <div className={`modal fade ${showModal ? "show" : ""}`} tabIndex="-1" aria-hidden={!showModal} style={{ display: showModal ? "block" : "none" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">{selectedSensorId}</h2>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {sensorData && (
                            <div id="plant-sensor-data">
                                <h3>Live Sensor Readings</h3>
                                Moisture: {sensorData.moisture}%;
                                Temperature: {sensorData.temperature}°F;
                                Illuminance: {sensorData.illuminance}lux;
                                Conductivity: {sensorData.conductivity};
                                Battery: {sensorData.battery}%;
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SensorButton = (props) => {
    return (
        <div>
            <button
                key={`sensor-${props.id}`}
                id={`sensors=${props.id}-button`}
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

    React.useEffect(() => {
        const url = '/sensors.json';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSensorIds(data);
            });
    }, []);

    const handleSensorClick = (sensorId) => {
        fetch(`/sensors/${sensorId}.json`)
            .then((response) => response.json())
            .then((data) => {
                setSensorData(data);
                setShowModal(true);
                setSelectedSensorId(sensorId);
            });
    };

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
                showModal={showModal}
                handleClose={handleClose}
            />
        </React.Fragment>
    );
}