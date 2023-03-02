import os
import json

import model
import hass

os.system("dropdb sensors")
os.system("createdb sensors")

model.connect_to_db(hass.app)
model.db.create_all()

with open("data/sensors.json") as f:
    sensor_data = json.loads(f.read())



model.db.session.add_all()
model.db.session.commit()

