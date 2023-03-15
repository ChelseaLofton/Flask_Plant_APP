import os
import json

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

import model
import crud
import server
from hass import get_plant_sensors, get_humidity_sensors, get_outlets


"""Don't forget to comment out before seeding plants"""

os.system("dropdb project_data")
os.system("createdb project_data")

model.connect_to_db(server.app)
model.db.create_all()


# # from sensors.py queires the HomeAssist API for the sensor data
sensor_data = get_plant_sensors()
sensors = sensor_data.keys()

for id in sensors:
    new_sensor = crud.create_plant_sensors(id)

    model.db.session.merge(new_sensor)
    model.db.session.commit()

for sensor_id, sensor_reading in sensor_data.items():
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


# from sensors.py queires the HomeAssist API for the sensor data
outlet_data = get_outlets()

for outlet_id, switch_ids in outlet_data.items():
    switch_ids = (
        switch_ids.get('2', None),
        switch_ids.get('3', None),
        switch_ids.get('4', None),
        switch_ids.get('5', None),

    )

    new_outlet = crud.create_outlets(outlet_id, switch_ids[0], switch_ids[1], switch_ids[2], switch_ids[3])

    model.db.session.merge(new_outlet)
    model.db.session.commit()


# from sensors.py queires the HomeAssist API for the sensor data
humidity_data = get_humidity_sensors()
humidity_sensors = humidity_data.keys()

for id in humidity_sensors:
    new_humidity_sensor = crud.create_humidity_sensor(id)

    model.db.session.merge(new_humidity_sensor)
    model.db.session.commit()

for humidity_sensor_id, humidity_sensor_reading in humidity_data.items():
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


with open("data/plant_data.json") as f:
    plant_data = json.loads(f.read())

for plant_id, plant_values in plant_data.items():
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
