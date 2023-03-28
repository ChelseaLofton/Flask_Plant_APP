"""
This script creates instances of the Plant model and populates the database with the plant data.
It must be run after the plant book is seeded.

Language: Python
Frameworks/Libraries: Flask-SQLAlchemy
Database: SQLAlchemy
"""

import json
from flask_sqlalchemy import SQLAlchemy

import model
import crud
import server

# Connect to the database and create all tables
model.connect_to_db(server.app)
model.db.create_all()

# Load plant data from JSON file
with open("data/plant_data.json") as f:
    plant_data = json.loads(f.read())

# Iterate through plant data and create Plant instances
for plant_id, plant_values in plant_data.items():
    
    plant_values['sensor_id'] = plant_id.split(" ")[-1]

    # Extract pid and sensor_id
    pid, sensor_id = (
        plant_values['pid'],
        plant_values['sensor_id']
    )

    # Create a new Plant instance and add it to the database
    new_plant = crud.create_plant(plant_id, pid, sensor_id)

    model.db.session.merge(new_plant)
    model.db.session.commit()
