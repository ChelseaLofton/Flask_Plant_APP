# from flask import flask
from homeassistant_api import Client

# import subprocess
# import json
import os

api_Key = os.environ.get('API_KEY')

with Client(
    'http://plants.home.stu.mp:8123/api',  # created a dns entry
    api_Key
) as client:

    entities = client.get_entities()

    # print(entities)

for entity in entities:
    print(entity)
# print(sensors)