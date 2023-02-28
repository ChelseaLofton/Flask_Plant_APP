# from flask import flask

from homeassistant_api import Client
from pprint import pprint
# from datetime import datetime

# import subprocess
import json
import os

# import model
# import crud

# url = 'http://plants.home.stu.mp:8123/api'
api_Key = os.environ.get('API_KEY')

with Client(
    'http://plants.home.stu.mp:8123/api',  # created a dns entry
    api_Key
) as client:

    sensors = client.get_entities()["sensor"] # returns a dictionary of groups, we want sensor group 
    outlet = client.get_entities()["switch"]    # return my outlet


plant_sensors = {}

def get_sensor_id()
for entity_id, entity in sensors.entities.items(): #class sensors to object entity class entities sensors.entities is a dict, with entity_id as a key, value will be an instance of the Entity class given for that id
    if entity_id.startswith("plant_sensor_"):
        sensor_id =entity_id.split("_")[2]
        # print(sensor_id)
    else:
        continue
    
    if sensor_id not in plant_sensors and len(sensor_id) == 2:
        plant_sensors[sensor_id] = {}

print(plant_sensors)



# print(plant_sensors)


    
#  
# 
# 
# 
#  # print(entity_id)
#     # print(entity)
#     # print(entity.state)
    
    # print(f" {entity_id} = {entity.state.state}")
    # print("---------")


# def sensors(self):
#     sensors = ()
#     url = 'http://plants.home.stu.mp:8123/api'


