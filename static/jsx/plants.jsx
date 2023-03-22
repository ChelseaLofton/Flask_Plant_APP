function PlantButtons() {
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

                setSensorData(sensor_readings)
                setPlantBookData(plant_data)
            });
    };

    return (
        <React.Fragment>
            <h2>All Plant Data</h2>
            <div id="plant-ids">
                {plantIds.map((plantID) => (
                        <button
                            key={`sensor-${plantID}`}
                            id={`sensors=${plantID}-button`}
                            onClick={() => handleButtonClick(plantID)}
                        >
                            {plantID}
                        </button>
                ))}
            </div>
            <div>
                <h4> Current Sensor Readings</h4>
                {sensorData && <div id="plant-sensor-data">
                    Battery: {sensorData.battery}%;
                    Conductivity: {sensorData.conductivity};
                    Illuminance: {sensorData.illuminance}lux;
                    Moisture: {sensorData.moisture}%;
                    Temperature: {sensorData.temperature}°F;
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
                    Image: {plantBookData.image_url};
                </div>}
            </div>
        </React.Fragment>
    );
};
