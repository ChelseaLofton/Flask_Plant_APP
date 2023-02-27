# from flask import flask
from homeassistant_api import Client

# import subprocess
import json
import os

api_Key = os.environ.get('API_KEY')

with Client(
    'http://plants.home.stu.mp:8123/api',  # created a dns entry
    api_Key
) as client:
    

    entities = client.get_entities()

for entity in entities.items():
    if entity.includes('switch'):
        print(entity)
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