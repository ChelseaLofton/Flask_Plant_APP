
const generateSensorButtons = () => {
    console.log('generateSensorButtons() called');

    const sensorContainer = document.querySelector('#sensor-ids');
    const url = '/sensors.json';
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const sensorIds = data;
            for (const sensorID of sensorIds) {
                const button = document.createElement('button');
                button.innerHTML = `Sensor ${sensorID}`;
                button.id = `sensor=${sensorID}-button`;
                button.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    getSensorData(sensorID);
                });
                sensorContainer.appendChild(button);
            }
        });
};



const getSensorData = (sensorID) => {
    const url = `/sensors/${sensorID}.json`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const sensor_battery = data.battery;
            const sensor_conductivity = data.conductivity;
            const sensor_illuminance = data.illuminance;
            const sensor_moisture = data.moisture;
            const sensor_temperature = data.temperature;
            // console.log(data)
            document.querySelector('#sensor-data').innerHTML = `Battery: ${sensor_battery}%, 
                Conductivity: ${sensor_conductivity}, Illuminance: ${sensor_illuminance}lux, 
                Moisture: ${sensor_moisture}%, Temperature: ${sensor_temperature}°F`;
        });
};



const displayOutletStates = () => {
    const outletContainer = document.querySelector('#outlet_ids');
    const url = '/outlets.json';
    fetch(url)
        .then((response) => response.json())
        .then((data) => {

            outletContainer.innerHTML = '';

            const outlets = data;
            const outletIDS = Object.keys(outlets);

            for (const outletID of outletIDS) {
                const existingOutletDiv = document.querySelector(`#outlet_${outletID}`);
                if (existingOutletDiv) {
                    outletContainer.removeChild(existingOutletDiv);
                }

                const outletDiv = document.createElement('div');
                outletDiv.innerHTML = `Outlet ${outletID}:`;

                const switches = outlets[outletID];
                const switchIDs = Object.keys(switches);

                for (const switchID of switchIDs) {
                    const switchDiv = document.createElement('div');
                    const label = document.createElement('label');
                    label.setAttribute('for', `outlet_${outletID}_switch_${switchID}`);
                    label.innerHTML = `Switch ${switchID}:`;

                    const switchState = switches[switchID] ? 'on' : 'off';
                    const switchButton = document.createElement('button');

                    switchButton.innerHTML = `${switchState}`;
                    switchButton.id = `${outletID}_${switchID}`;
                    switchButton.classList.add('switch');
                    switchButton.addEventListener('click', (evt) => {
                    
                        toggleOutletState(outletID, switchID);
                    });

                    if (switches[switchID] === true) {
                        switchButton.classList.add('on');
                    } else {
                        switchButton.classList.add('off');
                    }

                    switchDiv.appendChild(label);
                    switchDiv.appendChild(switchButton);
                    outletDiv.appendChild(switchDiv);
                }
                outletContainer.appendChild(outletDiv);
            }
        });
};



const toggleOutletState = (outletID, switchID) => {
    const url = `/outlets/${outletID}/${switchID}.json`;
    const switchButton = document.querySelector(`#${outletID}_${switchID}`);
    const currentState = switchButton.innerText;
    const newState = currentState === 'on' ? 'off' : 'on';

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ state: newState }),
        headers: { "Content-type": 'application/json' }

    })
        .then((response) => response.json())
        .then((data) => {
            const { state: newState } = data;
            switchButton.innerText = newState;

            if (newState === 'on') {
                switchButton.classList.remove('off');
                switchButton.classList.add('on');
            } else {
                switchButton.classList.remove('on');
                switchButton.classList.add('off');
            }

            
        })
};



const generatePlantButtons = () => {
    console.log('generatePlantButtons() called');

    const plantContainer = document.querySelector('#plant-ids');
    const url = '/plants.json';
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const plantIds = data;
            for (const plantID of plantIds) {
                const button = document.createElement('button');
                button.innerHTML = `${plantID}`;
                button.id = `plant=${plantID}-button`;
                button.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    getPlantData(plantID);
                });
                plantContainer.appendChild(button);
            }
        });
};



const getPlantData = (plantID) => {
    const url = `/plants/${plantID}.json`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
    
            const sensor_readings = data.sensor_readings;
            // const SensorReadings = Object.keys(sensor_readings)
            
            const sensor_battery = sensor_readings.battery;
            const sensor_conductivity = sensor_readings.conductivity;
            const sensor_illuminance = sensor_readings.illuminance;
            const sensor_moisture = sensor_readings.moisture;
            const sensor_temperature = sensor_readings.temperature;

            const plant_data = data.plant_data;
            console.log(plant_data)

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

            console.log(data)
            document.querySelector('#plant-sensor-data').innerHTML = `Current Sensor Readings: Battery:${sensor_battery}%, Conductivity:${sensor_conductivity}, 
                Illuminance:${sensor_illuminance}lux, Soil Moisture:${sensor_moisture}%, Temperature:${sensor_temperature}°F`;
            document.querySelector('#plantbook-data').innerHTML = `Plant Library Information: PlantData: PID:${pid}, Alias:${alias}, Category:${category}, Max Light:${max_light_lux}lux, Min Light:${min_light_lux}lux, 
                Max Temp:${max_temp}°F, Min Temp:${min_temp}°F, Max Env Humidity:${max_env_humid}%, Min Env Humidity:${min_env_humid}%, 
                Max Soil Moisture:${max_soil_moist}%, Min Soil Moisture:${min_soil_moist}%, Max Soil EC:${max_soil_ec}, 
                Min Soil EC:${min_soil_ec}, Image URL:${image_url}`;
        });
};



const generateHumidityButtons = () => {
    console.log('generateHumidityButtons() called');

    const sensorContainer = document.querySelector('#humidity-ids');
    const url = '/humidity.json';
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const humidityIds = data;
            for (const humidityID of humidityIds) {
                const button = document.createElement('button');
                button.innerHTML = `${humidityID}`;
                button.id = `sensor=${humidityID}-button`;
                button.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    getHumidityData(humidityID);
                });
                sensorContainer.appendChild(button);
            }
        });
};

const getHumidityData = (humidityID) => {
    const url = `/humidity/${humidityID}.json`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const sensor_id = data.humidity_sensor_id;
            const sensor_humidity = data.humidity;
            const sensor_pressure = data.pressure;
            const sensor_temperature = data.temperature;
            const sensor_battery = data.battery;

            document.querySelector('#humidity-data').innerHTML = `Sensor_id: ${sensor_id}, Humidity: ${sensor_humidity}%, 
                Pressure: ${sensor_pressure}, Temperature: ${sensor_temperature}°F, Battery: ${sensor_battery}%`;
        });
};







