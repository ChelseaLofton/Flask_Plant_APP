import os
import json

from flask_sqlalchemy import SQLAlchemy

import model
import crud
import server
from hass import get_plant_sensors, get_humidity_sensors, get_outlets



"""Don't forget to comment out before seeding plants"""
# os.system("dropdb project_data")
# os.system("createdb project_data")

model.connect_to_db(server.app)
model.db.create_all()



sensor_data = get_plant_sensors()       # from sensors.py queires the HomeAssist API for the sensor data
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

    new_sensor_data = crud.create_sensor_readings(battery, illuminance, conductivity,
        moisture, temperature, sensor_id)

    model.db.session.merge(new_sensor_data)
    model.db.session.commit()



outlet_data = get_outlets()       # from sensors.py queires the HomeAssist API for the sensor data

for outlet_id, switch_ids in outlet_data.items():
    switch_ids = (
        switch_ids['2'],
        switch_ids['3'],
        switch_ids['4'],
        switch_ids['5']
    )

    new_outlet = crud.create_outlets(outlet_id, switch_ids[0], switch_ids[1], switch_ids[2], switch_ids[3])
    
    model.db.session.merge(new_outlet)
    model.db.session.commit()



humidity_data = get_humidity_sensors()       # from sensors.py queires the HomeAssist API for the sensor data

for humidity_sensor_id, humidity_sensor_values in humidity_data.items():
    humidity, pressure, temperature, battery = (
        humidity_sensor_values['humidity'],
        humidity_sensor_values['pressure'],
        humidity_sensor_values['temperature'],
        humidity_sensor_values['battery'],
    )

    new_humidity_sensor = crud.create_humidity_sensor(humidity_sensor_id, humidity, pressure, temperature,  battery)

    model.db.session.merge(new_humidity_sensor)
    model.db.session.commit()



with open("data/plant_data.json") as f:
    plant_data = json.loads(f.read())

for plant_id, plant_values in plant_data.items():               #must be run after plant book is seeded
    plant_values['sensor_id'] = plant_id.split(" ")[-1]
    

    pid, sensor_id = (
        plant_values['pid'],
        plant_values['sensor_id']
    )
    
    new_plant = crud.create_plant(plant_id, pid, sensor_id)

    model.db.session.merge(new_plant)
    model.db.session.commit()


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




