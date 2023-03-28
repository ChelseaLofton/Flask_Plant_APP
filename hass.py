import os
import json
from homeassistant_api import Client


# Home Assistant API configuration
url = 'http://plants.home.stu.mp:8123/api'
api_key = os.environ.get('API_KEY')


# Initialize Home Assistant API client
with Client(url, api_key) as client:
    sensors = client.get_entities()["sensor"]
    switches = client.get_entities()["switch"]
    states = client.get_states()


def get_plant_sensors():
    """
    Function to retrieve plant sensor data from Home Assistant API.
    Returns a dictionary containing plant sensor data.
    """
    plant_sensors = {}

    for entity_id, entity in sensors.entities.items():  

        if entity_id.startswith("plant_sensor_"):
            sensor_id = entity_id.split("_")[2]
            reading = entity_id.split("_")[-1]

            if len(sensor_id) != 2:  
                continue

            if sensor_id not in plant_sensors:
                
                plant_sensors[sensor_id] = {}          

            try:  # type coercion
                value = float(entity.state.state)

                if value.is_integer():
                    value = int(value)

                if reading == "temperature":
                    value = value * 9/5 + 32

            except ValueError:
                value = entity.state.state

            plant_sensors[sensor_id][reading] = value

    return plant_sensors

# plant_sensor_data = get_plant_sensors()

# with open('plant_sensors.json', 'w') as f:    
#     json.dump(plant_sensor_data, f)


def get_humidity_sensors():
    """
    Function to retrieve humidity sensor data from Home Assistant API.
    Returns a dictionary containing humidity sensor data.
    """
    humidity_sensors = {}

    for entity_id, entity in sensors.entities.items():

        if entity_id.startswith("humidity"):
            sensor_id = entity_id.split("_")[1]
            reading = entity_id.split("_")[-1]

            if sensor_id == "vibration":
                continue

            if sensor_id not in humidity_sensors:
                humidity_sensors[sensor_id] = {}

            try:
                value = float(entity.state.state)

                if value.is_integer():
                    value = int(value)

            except ValueError:
                value = entity.state.state

            humidity_sensors[sensor_id][reading] = value

    return humidity_sensors



def get_outlets():
    """
    Function to retrieve outlet switch data from Home Assistant API.
    Returns a dictionary containing outlet switch data.
    """
    outlets = {}

    for entity_id, entity in switches.entities.items():
        if entity_id.startswith('outlet'):
            outlet_id = entity_id.split("_")[1]

            switch_id = entity_id.split("_")[-1]

            if outlet_id not in outlets:
                outlets[outlet_id] = {}

            if switch_id == "lock":
                continue

            if switch_id == 'usb':
                continue

            else:
                switch_id == switch_id
                

            outlets[outlet_id][switch_id] = entity.state.state

    return outlets


