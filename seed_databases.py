import os
import json

from flask_sqlalchemy import SQLAlchemy

import crud
import model
import server


os.system("dropdb project_data")
os.system("createdb project_data")

model.connect_to_db(server.app)
model.db.create_all()



with open("data/sensor_data.json") as f:
    sensor_data = json.loads(f.read())

# with open("data/plant_data.json") as f:
#     plant_data = json.loads(f.read())

# with open("data/outlet_data.json") as f:
#     outlet_data = json.loads(f.read())

# with open("data/humidity_sensors.json") as f:
#     sensor_data = json.loads(f.read())


sensor_readings_in_db = []
for sensor_id in sensor_data:
    illuminance, conductivity, moisture, temperature, battery = (
        sensor_id['illuminance'],
        sensor_id['conductivity'],
        sensor_id['moisture'],
        sensor_id['temperature'],
        sensor_id['battery']
    )

    new_sensor = crud.get_sensor_readings(sensor_readings_in_db)
    sensor_readings_in_db.append(new_sensor)

model.db.session.add_all(sensor_readings_in_db)
model.db.session.commit()



    sensor_tables.db.session.add_all(sensors_in_db)
    sensor_tables.db.session.commit()

    print("Hello, I am seeding sensors")


def seed_plants():

    os.system("dropdb plant_data")
    os.system("createdb plant_data")

    plant_tables.connect_to_db(app)
    plant_tables.db.create_all()


    with open("data/plant_data.json") as f:
        plant_data = json.loads(f.read())

    plants_in_db = []

    for plant_id, plant_data in plant_data.items():
        plant = plant_tables(plant_id=plant_id, **plant_data)
        plants_in_db.append(plant)


    plant_tables.db.session.add_all(plants_in_db)
    plant_tables.db.session.commit()
















# Note from sammy below
# 
# with app.app_context():
#     model.connect_to_db(app)
#     model.db.create_all()
#     model.db.session.add_all(cocktails_in_db)
#     model.db.session.commit()