import os
import json

from flask_sqlalchemy import SQLAlchemy

import crud
import model
import server
from sensors import get_plant_sensors


os.system("dropdb project_data")
os.system("createdb project_data")

model.connect_to_db(server.app)
model.db.create_all()


# from sensors.py queires the HomeAssist API for the sensor data
sensor_data = get_plant_sensors()
sensors = sensor_data.keys()

sensor_data_in_db = []

for id in sensors:
    new_sensor = crud.create_plant_sensors(id)
    sensor_data_in_db.append(new_sensor)

model.db.session.add_all(sensor_data_in_db)
model.db.session.commit()

sensor_data_in_db = []

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

    sensor_data_in_db.append(new_sensor_data)

model.db.session.add_all(sensor_data_in_db)
model.db.session.commit()


# with open("data/outlet_data.json") as f:
#     outlet_data = json.loads(f.read())

# outlets_in_db = []
# for outlet_id in outlet_data:
#     switch_id_2, switch_id_3, switch_id_4, switch_id_5 = (
#         outlet_id['switch_id_2'],
#         outlet_id['switch_id_3'],
#         outlet_id['switch_id_4'],
#         outlet_id['switch_id_5']
#     )

#     new_outlet = crud.create_outlets(outlet_id)
#     outlets_in_db.append(new_outlet)

# model.db.session.add_all(outlets_in_db)
# model.db.session.commit()


# with open("data/humidity_sensors.json") as f:
#     humidity_data = json.loads(f.read())

# humidity_sensors_in_db = []
# for humidity_sensor_id in humidity_data:
#     humidity, pressure, temperature,  battery = (
#         humidity_sensor_id['humidity'],
#         humidity_sensor_id['pressure'],
#         humidity_sensor_id['temperature'],
#         humidity_sensor_id['battery'],
#     )

#     new_humidity_sensor = crud.create_humidity_sensor(humidity_sensor_id)
#     humidity_sensors_in_db.append(new_humidity_sensor)

# model.db.session.add_all(humidity_sensors_in_db)
# model.db.session.commit()

with open("data/plant_data.json") as f:
    plant_data = json.loads(f.read())

plantbooks_data_in_db = []
plants_data_in_db = []
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
    plantbooks_data_in_db.append(new_plantbook_data)

    # new_plant_data = crud.create_plant(plant_id, pid, sensor_id)
    # plants_data_in_db.append(new_plant_data)

model.db.session.add_all(plantbooks_data_in_db)
model.db.session.commit()



