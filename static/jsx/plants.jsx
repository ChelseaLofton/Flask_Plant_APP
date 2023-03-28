const PlantModal = (props) => {
    const { plantBookData, sensorData, selectedPlantId, showModal, handleClose } = props;
    const displayName = selectedPlantId ? selectedPlantId.slice(0, -2) : '';
    const sensorNumber = selectedPlantId ? selectedPlantId.slice(-2) : '';

    return (
        <div className={`modal fade ${showModal ? "show" : ""}`} tabIndex="-1" aria-hidden={!showModal} style={{ display: showModal ? "block" : "none" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">{displayName}</h2>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {sensorData && (
                            <div id="plant-sensor-data">
                                <h3>Live Sensor Readings</h3>
                                <ul>
                                    <li> Sensor Id: {sensorNumber}</li>
                                    <li>Moisture: {sensorData.moisture}%</li>
                                    <li>Temperature: {sensorData.temperature}°F</li>
                                    <li>Illuminance: {sensorData.illuminance}lux</li>
                                    <li>Conductivity: {sensorData.conductivity}</li>
                                    <li>Battery: {sensorData.battery}%</li>
                                </ul>
                            </div>
                        )}
                        {plantBookData && (
                            <div id="plantbook-data">
                                <h3>Plant Library Data</h3>
                                <ul>
                                    <li>Alias: {plantBookData.alias}</li>
                                    <li>Category: {plantBookData.category}</li>
                                    <li>Max Light: {plantBookData.max_light_lux}lux</li>
                                    <li>Min Light: {plantBookData.min_light_lux}lux</li>
                                    <li>Max Temperature: {plantBookData.max_temp}°F</li>
                                    <li>Min Temperature: {plantBookData.min_temp}°F</li>
                                    <li>Max Env. Humidity: {plantBookData.max_env_humid}%</li>
                                    <li>Min Env. Humidity: {plantBookData.min_env_humid}%</li>
                                    <li>Max Soil Moisture: {plantBookData.max_soil_moist}%</li>
                                    <li>Min Soil Moisture: {plantBookData.min_soil_moist}%</li>
                                    <li>Max Soil EC: {plantBookData.max_soil_ec}</li>
                                    <li>Min Soil EC: {plantBookData.min_soil_ec}</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};



const PlantButton = (props) => {
    const { id, onClick } = props;
    return (
        <button className="plant-button" type="button" onClick={() => onClick(id)}>
            <img className="round-image" key={`sensor-${id}`} id={`sensors=${id}-button`} src={`/static/images/project photos/${id}.png`} />
        </button>
    );
};


function Plant() {
    const [plantIds, setPlantIds] = React.useState([]);
    const [sensorData, setSensorData] = React.useState(null);
    const [plantBookData, setPlantBookData] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedPlantId, setSelectedPlantId] = React.useState(null);

    React.useEffect(() => {
        fetch('/plants.json')
            .then(response => response.json())
            .then(data => {
                setPlantIds(data);
            });
    }, []);


    const handleButtonClick = (plantID) => {
        fetch(`/plants/${plantID}.json`)
            .then((response) => response.json())
            .then((data) => {
                const sensor_readings = data.sensor_readings;
                const plant_data = data.plant_data;

                // console.log(sensor_readings);
                // console.log(plant_data);

                setSelectedPlantId(plantID);
                setShowModal(true);
                setSensorData(sensor_readings);
                setPlantBookData(plant_data);
            });
    };


    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <React.Fragment>
            <h2>All Plant Data</h2>
            <div className="container">
                {plantIds && (
                    <React.Fragment>
                        {plantIds.reduce((rows, plantID, i) => {
                            if (i % 4 === 0) rows.push([]);
                            rows[rows.length - 1].push(plantID);
                            return rows;
                        }, []).map((row, index) => (
                            <div className="row" key={`row-${index}`}>
                                {row.map((plantID) => (
                                    <div className="col-md-3" key={plantID}>
                                        <PlantButton id={plantID} onClick={handleButtonClick} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </React.Fragment>
                )}
                <PlantModal
                    plantBookData={plantBookData}
                    sensorData={sensorData}
                    selectedPlantId={selectedPlantId}
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                />
            </div>
        </React.Fragment>
    );
}