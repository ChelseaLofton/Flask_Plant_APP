'use strict';


function toggleSwitch(outlet_id, switch_id) {
    fetch('/change_state.json', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            outlet_id: outlet_id,
            switch_id: switch_id
        })
    })
        .then(response => response.json())
        .then(data => {
            let outlet_button = document.getElementById('outlet-${outlet_id}-switch-${switch_id}');
            outlet_button.classList.toggle('on');
            outlet_button.classList.toggle('off');
            let outlet_state =document.getElementById('outlet-${outlet_id}-switch-${switch_id}-state');
        })
        .catch(error => {
            console.log(error);
        });
}

function addOutletListeners() {
    let outlet_buttons = document.getElementsByClassName('outlet-switch');
    for (let i = 0; i < outlet_buttons.length; i++) {
        let outlet_button = outlet_buttons[i];
        let outlet_id = outlet_button.dataset.outletID;
        let switch_id = outlet_button.dataset.switchID;
        outlet_button.addEventListener('click', () => {
            toggleSwitch(outlet_id, switch_id);
        });
    }
}



document.addEventListener('DOMContentLoaded', () => {
    addOutletListeners();
});










button.addEventListener('click', (evt) => {
    evt.preventDefault();
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
            document.querySelector('#sensor-data').innerHTML = `Battery: ${sensor_battery}%, Conductivity: ${sensor_conductivity}, Illuminance: ${sensor_illuminance}lux, Moisture: ${sensor_moisture}%, Temperature: ${sensor_temperature}°F`;
        });
});
sensorContainer.appendChild(button);
}