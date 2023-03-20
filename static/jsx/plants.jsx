// import App from './app.jsx';

const PlantButtons = () => {
    const [plantIds, setPlantIds] = React.useState([]);

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
                const sensor_battery = sensor_readings.battery;
                const sensor_conductivity = sensor_readings.conductivity;
                const sensor_illuminance = sensor_readings.illuminance;
                const sensor_moisture = sensor_readings.moisture;
                const sensor_temperature = sensor_readings.temperature;

                const plant_data = data.plant_data;

                const pid = plant_data.pid;
                const alias = plant_data.alias;
                const category = plant_data.category;
                const max_light_lux = plant_data.max_light_lux;
                const min_light_lux = plant_data.min_light_lux;
                const max_temp = plant_data.max_temp;
                const min_temp = plant_data.min_temp;
                const max_env_humid = plant_data.max_env_humid;
                const min_env_humid = plant_data.min_env_humid;
                const max_soil_moist = plant_data.max_soil_moist;
                const min_soil_moist = plant_data.min_soil_moist;
                const max_soil_ec = plant_data.max_soil_ec;
                const min_soil_ec = plant_data.min_soil_ec;
                const image_url = plant_data.image_url;

                document.querySelector('#plant-sensor-data').innerHTML = `Battery:${sensor_battery}%, Conductivity:${sensor_conductivity}, Illuminance:${sensor_illuminance}lux, Soil Moisture:${sensor_moisture}%, Temperature:${sensor_temperature}°F`;
                document.querySelector('#plantbook-data').innerHTML = `PID:${pid}, Alias:${alias}, Category:${category}, Max Light:${max_light_lux}, Min Light:${min_light_lux}, Max Temp:${max_temp}°F, Min Temp:${min_temp}°F, Max Environment Humidity:${max_env_humid}%, Min Environment Humidity:${min_env_humid}%, Max Soil Moisture:${max_soil_moist}%, Min Soil Moisture:${min_soil_moist}%, Max Soil EC:${max_soil_ec}, Min Soil EC:${min_soil_ec}, Image URL:${image_url}`;
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
        </React.Fragment>
    );
};


// export default PlantButtons;

// ReactDOM.render(<PlantButtons />, document.getElementById('plant-ids'));
