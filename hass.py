# from flask import flask

from homeassistant_api import Client
from pprint import pprint
# from datetime import datetime


# import subprocess
import json
import os



# url = 'http://plants.home.stu.mp:8123/api'
api_Key = os.environ.get('API_KEY')

with Client(
    'http://plants.home.stu.mp:8123/api',  # created a dns entry
    api_Key
) as client:

    # returns a dictionary of groups, we want sensor group
    sensors = client.get_entities()["sensor"]
    outlet = client.get_entities()["switch"]   


plant_sensors = {}


for entity_id, entity in sensors.entities.items():  # class sensors to object entity class entities sensors.entities is a dict, with entity_id as a key, value will be an instance of the Entity class given for that id
    
    if entity_id.startswith("plant_sensor_"):
        sensor_id = entity_id.split("_")[2]
        reading = entity_id.split("_")[-1]
        # # print(sensor_id)
        # print(reading)
    
        if len(sensor_id) != 2:                    #ignores all sensors that are not plant_sensors
            continue    
    
        if sensor_id not in plant_sensors:          
            plant_sensors[sensor_id] = {}          #adds our sliced id as a key in our dictionary and set the value to an empty dictionary
    
        if reading not in plant_sensors[sensor_id]:
            plant_sensors[sensor_id][reading]= []
    
        plant_sensors[sensor_id][reading].append(entity.state.state)

pprint(plant_sensors)



# humidity_sensors = {}

# for entity_id, entity in sensors.entities.items():
    
#     if entity_id.startswith("lumi_lumi_"):
#         sensor_id = entity_id.split("_")[2]
#         reading = entity_id.split("_")[-1]
        
#         if sensor_id == "vibration":
#             continue

#         if sensor_id not in humidity_sensors:
#             humidity_sensors[sensor_id] = {}

#         if reading not in humidity_sensors[sensor_id]:
#             humidity_sensors[sensor_id][reading] = []


#         humidity_sensors[sensor_id][reading].append(entity.state.state)

# pprint(humidity_sensors)



# outlets = {}

# for entity_id, entity in outlet.entities.items():   
#     if entity_id.startswith('tzlivingroom'):
#         outlet_id = entity_id.split("_")[0]
#         switch_key = entity_id.split("_")[-1]

#         if outlet_id not in outlets:
#             outlets[outlet_id] = {}

#         if switch_key == "lock":
#             continue

#         elif switch_key == 'switch':
#             switch_id = 1
        
#         else:
#             switch_id =switch_key
        
#         if switch_id not in outlets[outlet_id]:
#             outlets[outlet_id][switch_id]= []

#         outlets[outlet_id][switch_id].append(entity.state.state)


# pprint(outlets)

    



