"""
This script defines helper functions to create instances of the database models using Flask-SQLAlchemy.
It populates the database with sensor data obtained from the Home Assistant API. Run seed_plants.py 
after this script to populate the database with plant data.

Language: Python
Frameworks/Libraries: Flask-SQLAlchemy, Home Assistant API
Database: SQLAlchemy
"""

import os  
import json
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import model
import crud
import server
from hass import get_plant_sensors, get_humidity_sensors, get_outlets

"""Need to start over? Drop the database and create a new one."""
# os.system("dropdb project_data")
# os.system("createdb project_data")

# Connect to the database and create tables if they don't exist
model.connect_to_db(server.app)
model.db.create_all()


# Get data from Home Assistant API
sensor_data = get_plant_sensors()
sensors = sensor_data.keys()
outlet_data = get_outlets()


# Create PlantSensor instances and add them to the database
for id in sensors:
    new_sensor = crud.create_plant_sensors(id)
    model.db.session.merge(new_sensor)
    model.db.session.commit()


# Create SensorReading instances and add them to the database
for sensor_id, sensor_reading in sensor_data.items():
    # Extract sensor data
    illuminance, conductivity, moisture, temperature, battery = (
        sensor_reading['illuminance'],
        sensor_reading['conductivity'],
        sensor_reading['moisture'],
        sensor_reading['temperature'],
        sensor_reading['battery'] if 'battery' in sensor_reading else None,
    )

    new_sensor_data = crud.create_sensor_readings(
        battery, illuminance, conductivity, moisture, temperature,
        created_at=datetime.now(), sensor_id=sensor_id)

    model.db.session.merge(new_sensor_data)
    model.db.session.commit()


# Create Outlet instances and add them to the database
for outlet_id, switch_ids in outlet_data.items():
    # Extract switch IDs
    switch_ids = (
        switch_ids.get('2', None),
        switch_ids.get('3', None),
        switch_ids.get('4', None),
        switch_ids.get('5', None),

    )

    new_outlet = crud.create_outlets(outlet_id, switch_ids[0], switch_ids[1], switch_ids[2], switch_ids[3])

    model.db.session.merge(new_outlet)
    model.db.session.commit()


# Get humidity sensor data from Home Assistant API
humidity_data = get_humidity_sensors()
humidity_sensors = humidity_data.keys()

# Create HumiditySensor instances and add them to the database
for id in humidity_sensors:
    new_humidity_sensor = crud.create_humidity_sensor(id)
    model.db.session.merge(new_humidity_sensor)
    model.db.session.commit()

# Create HumidityReading instances and add them to the database
for humidity_sensor_id, humidity_sensor_reading in humidity_data.items():
    # Extract humidity sensor data
    humidity, pressure, temperature, battery = (
        humidity_sensor_reading['humidity'],
        humidity_sensor_reading['pressure'],
        humidity_sensor_reading['temperature'],
        humidity_sensor_reading['battery'],
    )

    new_humidity_sensor_data = crud.create_humidity_readings(
        humidity, pressure, temperature,  battery, 
        datetime.now(), humidity_sensor_id=humidity_sensor_id)

    model.db.session.merge(new_humidity_sensor_data)
    model.db.session.commit()


# Load plant data from a JSON file
with open("data/plant_data.json") as f:
    plant_data = json.loads(f.read())

# Create Plant instances and add them to the database
for plant_id, plant_values in plant_data.items():
    # Extract plant data
    pid, display_pid, alias, category, max_light_lux, min_light_lux, \
        max_temp, min_temp, max_env_humid, min_env_humid, max_soil_moist, \
        min_soil_moist, max_soil_ec, min_soil_ec, image_url = (
            plant_values['pid'],
            plant_values['display_pid'],
            plant_values['alias'],
            plant_values['category'],
            plant_values['max_light_lux'],
            plant_values['min_light_lux'],
            plant_values['max_temp'],
            plant_values['min_temp'],
            plant_values['max_env_humid'],
            plant_values['min_env_humid'],
            plant_values['max_soil_moist'],
            plant_values['min_soil_moist'],
            plant_values['max_soil_ec'],
            plant_values['min_soil_ec'],
            plant_values['image_url'],
        )

    new_plantbook_data = crud.create_plant_data(pid, display_pid, alias, category, max_light_lux, min_light_lux,
                                                max_temp, min_temp, max_env_humid, min_env_humid, max_soil_moist,
                                                min_soil_moist, max_soil_ec, min_soil_ec, image_url)

    model.db.session.merge(new_plantbook_data)
    model.db.session.commit()
