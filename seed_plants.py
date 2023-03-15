import model
import crud 
import server
import json

from flask_sqlalchemy import SQLAlchemy



model.connect_to_db(server.app)
model.db.create_all()


"""Run after running seed-databases.py"""


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