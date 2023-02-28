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

for entity_id, entity in sensors.entities.items(): #class sensors to object entity class entities
    
    print(entity_id)
    print(entity)
    print(entity.state)
    
    print(f" {entity_id} = {entity.state.state}")
# pprint(entities.keys())
# 
# 
# 
# 
# 
# # entities = [Client.get_entity(entity) for entity in entity_data]

# entities_bystate = Client.get_states(entity_data)
    
# for entity_id in entity_ids.keys():
#     print(entity_id)


# print(entities)
# print(entities_bystate)

# sensors = [entity for entity in entities if entity.entity_type == 'sensor']

# data= []
# for sensor in sensors:
#     data.append({
#             'name': sensor.name,
#             'state': sensor.state,
#             'unit_of_measurement': sensor.attributes.get('unit_of_measurement', ''),
#             'last_updated': sensor.last_updated,
#         })

#     # Print the data to the console
# for row in data:
#     print(row)