from flask import (Flask, render_template, request, flash, session,
        redirect, jsonify)
from flask_sqlalchemy import SQLAlchemy
from jinja2 import StrictUndefined
from hass import get_plant_sensors, get_humidity_sensors, get_outlets, set_outlet_state
from model import (db, connect_to_db, Plant, PlantBook, PlantSensor,
    SensorReading, Outlet, HumiditySensor)

from hass import client
from homeassistant_api import State

app = Flask(__name__)
app.secret_key = "ILovePlants"
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():

    return render_template('index.html')


@app.route('/plants.json')
def view_all_plants():
    """View all plants."""

    plants = Plant.query.all()
    plant_ids = [plant.plant_id for plant in plants]

    return jsonify(plant_ids)


@app.route('/plants/<plant_id>.json')
def view_plant_data(plant_id):
    """View a specific plant."""

    plant = Plant.query.filter_by(plant_id=plant_id).first()

    if plant is None:
        return f"Now plant found with ID {plant_id}"

    pid = plant.pid
    sensor_id = plant.sensor_id
    sensor_readings = get_plant_sensors().get(sensor_id)

    plant_data = PlantBook.query.filter_by(pid=pid).first()

    return jsonify({"plant_data":plant_data.to_dict(), "sensor_readings":sensor_readings})


@ app.route('/sensors.json')
def view_all_sensors():
    """View all sensors."""

    sensors=PlantSensor.query.all()
    sensor_ids=[sensor.sensor_id for sensor in sensors]

    return jsonify(sensor_ids)


@ app.route('/sensors/<sensor_id>.json')
def get_sensor_data(sensor_id):
    """View all sensor readings for a specific sensor."""

    sensor_data=get_plant_sensors().get(sensor_id)

    if sensor_data:
        return jsonify(sensor_data)
    else:
        return jsonify({"error": "Sensor not found."})


@ app.route('/outlets.json')
def view_outlets():
    """View all climate controls."""

    outlets=get_outlets()
    # humidity_sensors = get_humidity_sensors()

    return jsonify(outlets)


@ app.route("/outlets/<outlet_id>/<switch_id>.json", methods=['POST'])
def switch_outlet_state(outlet_id, switch_id):
    """Toggle switch on/off."""

    print(f"Switching outlet {outlet_id} {switch_id}...")

    new_state=request.json.get('state')
    print(f"new_state = {new_state}")
    entity_id=f"switch.{outlet_id}_switch_{switch_id}"
    print(f"entity_id = {entity_id}")

    switch=client.get_domain("switch")
    r=switch.services["toggle"](entity_id=entity_id)
    print(r)

    return jsonify({"state": r[0].state})



@app.route("/humidity.json")
def view_humidity_sensors():
    """View all humidity sensors."""

    humidity_sensors = HumiditySensor.query.all()
    humidity_sensor_ids = [sensor.humidity_sensor_id for sensor in humidity_sensors]

    return jsonify(humidity_sensor_ids)


@ app.route('/humidity/<humidity_id>.json')
def get_humidity_data(humidity_id):
    """View all sensor readings for a specific sensor."""

    humidity_data = get_humidity_sensors().get(humidity_id)

    if humidity_data:
        return jsonify(humidity_data)
    else:
        return jsonify({"error": "Sensor not found."})


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port=3000, debug=True)
