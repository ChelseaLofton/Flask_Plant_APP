const PlantButton = (props) => {
    return (
        <React.Fragment>
            <div>
            <button
                key={`sensor-${props.id}`}
                id={`sensors=${props.id}-button`}
                onClick={() => props.onClick(props.id)}
            >
                {props.id}
            </button>
            <img src={`/static/images/project photos/${props.id}.png`} width="300" /></div>
        </React.Fragment>
    );
}

const SensorData = (props) => {
    return (
        <div>
        <h4> Current Sensor Readings</h4>
        {props.sensorData && <div id="plant-sensor-data">
            Battery: {props.sensorData.battery}%;
            Conductivity: {props.sensorData.conductivity};
            Illuminance: {props.sensorData.illuminance}lux;
            Moisture: {props.sensorData.moisture}%;
            Temperature: {props.sensorData.temperature}°F;
        </div>}

    </div>
    )};



function Plant() {
    const [plantIds, setPlantIds] = React.useState([]);
    const [sensorData, setSensorData] = React.useState(null);
    const [plantBookData, setPlantBookData] = React.useState(null);

    React.useEffect(() => {
        fetch('/plants.json')
            .then(response => response.json())
            .then(data => {
                setPlantIds(data);
            });
    }, []);

    const handleButtonClick = (plantID) => {
        fetch(`/plants/${plantID}.json`)
            .then(response => response.json())
            .then(data => {
                const sensor_readings = data.sensor_readings;
                const plant_data = data.plant_data;

                console.log(sensor_readings);
                console.log(plant_data);

                setSensorData(sensor_readings)
                setPlantBookData(plant_data)
            });
    };

    return (
        <React.Fragment>
            <h2>All Plant Data</h2>
            <div id="plant-ids">
                {plantIds.map((plantID) => (
                        <PlantButton id={plantID} onClick={handleButtonClick} plantBookData={plantBookData} />
                ))}
            </div>
            <div>
                <h4> Current Sensor Readings</h4>
                {sensorData && <div id="plant-sensor-data">
                    Moisture: {sensorData.moisture}%;
                    Temperature: {sensorData.temperature}°F;
                    Illuminance: {sensorData.illuminance}lux;
                    Conductivity: {sensorData.conductivity};
                    Battery: {sensorData.battery}%;
                </div>}
            </div>
            <div>
                <h4>Plant Book Data</h4>
                {plantBookData && <div id="plantbook-data">
                    Alias: {plantBookData.alias};
                    Category: {plantBookData.category};
                    Max Light: {plantBookData.max_light_lux}lux;
                    Min Light: {plantBookData.min_light_lux}lux;
                    Max Temperature: {plantBookData.max_temp}°F;
                    Min Temperature: {plantBookData.min_temp}°F;
                    Max Env. Humidity: {plantBookData.max_env_humid}%;
                    Min Env. Humidity: {plantBookData.min_env_humid}%;
                    Max Soil Moisture: {plantBookData.max_soil_moist}%;
                    Min Soil Moisture = {plantBookData.min_soil_moist}%;
                    Max Soil EC: {plantBookData.max_soil_ec};
                    Min Soil EC: {plantBookData.min_soil_ec};
                </div>}
            </div>
        </React.Fragment>
    );
};
