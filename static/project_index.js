
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



generateSensorButtons();
displayOutletStates();

    // function ShowSensorReadings(evt) {
    //     evt.preventDefault();

    //     const sensorID = document.querySelector('#sensor-field').value;
    //     const url = `/sensors/${sensorID}.json`;

    //     console.log(sensorID);

    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const sensor_battery = data.battery;
    //             const sensor_conductivity = data.conductivity;
    //             const sensor_illuminance = data.illuminance;
    //             const sensor_moisture = data.moisture;
    //             const sensor_temperature = data.temperature;
    //             // console.log(data)
    //             document.querySelector('#sensor-data').innerHTML = `Battery: ${sensor_battery}%, Conductivity: ${sensor_conductivity}, Illuminance: ${sensor_illuminance}lux, Moisture: ${sensor_moisture}%, Temperture: ${sensor_temperature}°F`;
    //         });
    // }

    // document.querySelector('#sensor-form').addEventListener('submit', ShowSensorReadings);








    // function ShowPlantData(evt) {
    //     evt.preventDefault();

    //     const plantID = document.querySelector('#plant-field').value;
    //     const url = `/plants/${plantID}.json`;

    //     console.log(plantID);

    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const plant_name = data.plant;
    //             const plant_sensor = data.sensor_id;
    //             const plant_data = data.location;
    //             const plant_sensor = data.sensor;
    //             // console.log(data)
    //             document.querySelector('#plant-data').innerHTML = `Name: ${plant_name}, Type: ${plant_type}, Location: ${plant_location}, Sensor: ${plant_sensor}`;
    //         });
    // }