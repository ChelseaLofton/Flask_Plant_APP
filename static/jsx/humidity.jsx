/**
 * Language: JavaScript (JSX)
 * Frameworks: React
 * Libraries: React Bootstrap
 * Components: HumidityModal, HumidityButton, Humidity
 */



// HumidityModal component displays live sensor readings in a modal
const HumidityModal = (props) => {
    const { humidityData, showModal, selectedHumidityId, handleClose } = props;

    return (
        <div
            className={`modal fade ${showModal ? "show" : ""}`}
            tabIndex="-1"
            aria-hidden={!showModal}
            style={{ display: showModal ? "block" : "none" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Live Sensor Readings</h2>

                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {humidityData && (
                            <div id="plant-sensor-data">
                                <ul>
                                    <li>Humidity: {humidityData.humidity}%</li>
                                    <li>Pressure: {humidityData.pressure}</li>
                                    <li>Temperature: {humidityData.temperature}°F</li>
                                    <li>Battery: {humidityData.battery}%</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


// HumidityButton component renders individual humidity sensor buttons
const HumidityButton = (props) => {
    return (
        <button
            key={`humidity-${props.id}`}
            id={`sensor=${props.id}-button`}
            className="humidity-button"
            onClick={() => props.onClick(props.id)}
        >
            {props.id}
        </button>
    );
};


function Humidity() {
    const [humidityIds, setHumidityIds] = React.useState([]);
    const [humidityData, setHumidityData] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedHumidityId, setSelectedHumidityId] = React.useState(null);

    // Fetch humidity sensor IDs from API
    React.useEffect(() => {
        const url = "/humidity.json";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setHumidityIds(data);
            });
    }, []);

    // Handle click event on a humidity sensor button
    const handleHumidityClick = (humidityId) => {
        const url = `/humidity/${humidityId}.json`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setHumidityData(data);
                setSelectedHumidityId(humidityId);
                setShowModal(true);
            });
    };

    // Handle closing the modal 
    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <React.Fragment>
            <div id="humidity-ids">
                {humidityIds.map((humidityID) => (
                    <HumidityButton key={humidityID} id={humidityID} onClick={handleHumidityClick} />
                ))}
            </div>
            <div>
                <HumidityModal
                    humidityData={humidityData}
                    setSelectedHumidityId={selectedHumidityId}
                    showModal={showModal}
                    handleClose={handleClose}
                />
            </div>
        </React.Fragment>
    );
}