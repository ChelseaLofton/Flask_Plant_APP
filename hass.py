# from flask import flask
from homeassistant_api import Client
from pprint import pprint

# import subprocess
import json
import os

api_Key = os.environ.get('API_KEY')

with Client(
    'http://plants.home.stu.mp:8123/api',  # created a dns entry
    api_Key
) as client:
    

    sensors = client.get_entities()["sensor"] # returns a dictionary of groups, we want sensor group 
    outlet = client.get_entities()["switch"]    # return my outlet

for entity_id, entity in sensors.entities.items(): #class sensors to object entity class entities sensors.entities is a dict, with entity_id as a key, value will be an instance of the Entity class given for that id
    
    # print(entity_id)
    # print(entity)
    # print(entity.state)
    
    print(f" {entity_id} = {entity.state.state}")
    # print("---------")