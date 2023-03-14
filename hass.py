from homeassistant_api import Client

import asyncio
from pprint import pprint
import requests
import json
import os


url = 'http://plants.home.stu.mp:8123/api'
api_Key = os.environ.get('API_KEY')

with Client(
    'http://plants.home.stu.mp:8123/api',  # created a dns entry
    api_Key
) as client:

    sensors = client.get_entities()["sensor"]
    switches = client.get_entities()["switch"]
    states = client.get_states()


def get_plant_sensors():
    plant_sensors = {}

    for entity_id, entity in sensors.entities.items():  # class sensors to object entity class entities sensors.entities is a dict, with entity_id as a key, value will be an instance of the Entity class given for that id

        if entity_id.startswith("plant_sensor_"):
            sensor_id = entity_id.split("_")[2]
            reading = entity_id.split("_")[-1]

            if len(sensor_id) != 2:  # ignores all sensors that are not plant_sensors
                continue

            if sensor_id not in plant_sensors:
                # adds our sliced id as a key in our dictionary and set the value to an empty dictionary
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
    humidity_sensors = {}

    for entity_id, entity in sensors.entities.items():

        if entity_id.startswith("lumi_lumi_"):
            sensor_id = entity_id.split("_")[2]
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

# humidity_sensor_data = get_humidity_sensors()

# with open('humidity_sensors.json', 'w') as f:
#     json.dump(humidity_sensor_data, f)


def get_outlets():
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



def set_outlet_state(outlet_id, switch_id, new_state):

    entity_id = f"{outlet_id}_{switch_id}"
    data = {'state': new_state}
    response = client.post(f"states/{entity_id}", data=data)
    
    if response.status_code == 200:
        print(f"{entity_id} turned {new_state}")
    else:
        print(f"Error: {response.status_code} {response.reason}")
    