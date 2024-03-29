"""
Server module for handling routes and API calls.

Language: Python
Frameworks/Libraries: Flask, SQLAlchemy, Jinja2
Database: SQLAlchemy
APIs: Home Assistant (hass), PlantBookAPI
"""

from flask import (Flask, render_template, request, jsonify)
from flask_sqlalchemy import SQLAlchemy
from jinja2 import StrictUndefined
from hass import client, get_plant_sensors, get_humidity_sensors, get_outlets
from model import (db, connect_to_db, Plant, PlantBook, PlantSensor,
            SensorReading, HumidityReading, HumiditySensor,)
from PlantBookAPI import PlantBookAPI
import os
import urllib.parse


app = Flask(__name__)
app.secret_key = os.environ["APP_SECRET_KEY"]
app.jinja_env.undefined = StrictUndefined



@app.route('/')
def homepage():


    return render_template('index_react.html')


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
    
    print(sensor_readings)

    plant_data = PlantBook.query.filter_by(pid=pid).first()

    return jsonify({"plant_data": plant_data.to_dict(), "sensor_readings": sensor_readings})


@app.route('/sensors.json')
def view_all_sensors():
    """View all sensors."""

    sensors = PlantSensor.query.order_by(PlantSensor.sensor_id.asc()).all()
    sensor_ids = [sensor.sensor_id for sensor in sensors]

    return jsonify(sensor_ids)


@app.route('/sensors/<sensor_id>.json')
def get_sensor_data(sensor_id):
    """View all sensor readings for a specific sensor."""

    plant = Plant.query.filter_by(sensor_id=sensor_id).first()
    plant_id = plant.plant_id if plant else None

    sensor_readings = get_plant_sensors().get(sensor_id)

    print(sensor_readings)
    print(plant_id)

    return jsonify({"sensor_readings": sensor_readings, "plant_id": plant_id})


@ app.route('/outlets.json')
def view_outlets():
    """View all climate controls."""

    outlets = get_outlets()

    return jsonify(outlets)


@ app.route("/outlets/<outlet_id>/<switch_id>.json", methods=['POST'])
def switch_outlet_state(outlet_id, switch_id):
    """Toggle switch on/off."""

    print(f"Switching outlet {outlet_id} {switch_id}...")

    new_state = request.json.get('state')
    print(f"new_state = {new_state}")

    entity_id = f"switch.outlet_{outlet_id}_switch_{switch_id}"
    print(f"entity_id = {entity_id}")

    switch = client.get_domain("switch")
    r = switch.services["toggle"](entity_id=entity_id)

    print(r)

    return jsonify({"state": r[0].state})


@app.route("/humidity.json")
def view_humidity_sensors():
    """View all humidity sensors."""

    humidity_sensors = HumiditySensor.query.all()
    humidity_sensor_ids = [
        sensor.humidity_sensor_id for sensor in humidity_sensors]

    return jsonify(humidity_sensor_ids)


@ app.route('/humidity/<humidity_id>.json')
def get_humidity_data(humidity_id):
    """View all sensor readings for a specific sensor."""

    humidity_data = get_humidity_sensors().get(humidity_id)

    if humidity_data:
        return jsonify(humidity_data)
    else:
        return jsonify({"error": "Sensor not found."})



from datetime import datetime, timedelta

now = datetime.utcnow()
last_24_hours = now - timedelta(hours=24)

@app.route('/humidity-readings.json')
def view_humidity_readings():
    # Query the humidity readings for the last 24 hours
    humidity_readings = db.session.query(
        HumidityReading.humidity_sensor_id,
        HumidityReading.humidity,
        HumidityReading.created_at
    ).filter(
        HumidityReading.created_at >= last_24_hours,
        HumidityReading.humidity.isnot(None)
    ).order_by(HumidityReading.created_at.desc()).all()

    # Grouping by sensor ID
    humidity_readings_dict = {}
    for reading in humidity_readings:
        sensor_id = reading.humidity_sensor_id
        if sensor_id not in humidity_readings_dict:
            humidity_readings_dict[sensor_id] = []
        humidity_readings_dict[sensor_id].append({
            'humidity': reading.humidity,
            'created_at': reading.created_at
        })

    return jsonify(humidity_readings_dict)



@app.route('/soil-moisture-readings.json')
def view_soil_moisture_readings():

    # Query the moisture readings for the last 24 hours
    moisture_readings = db.session.query(
        SensorReading.sensor_id,
        SensorReading.moisture,
        SensorReading.created_at
    ).filter(
        SensorReading.created_at >= last_24_hours,
        SensorReading.moisture.isnot(None)
    ).order_by(SensorReading.created_at.desc()).all()

    # Grouping by sensor ID
    moisture_readings_dict = {}
    for reading in moisture_readings:
        sensor_id = reading.sensor_id
        
        if sensor_id not in moisture_readings_dict:
            moisture_readings_dict[sensor_id] = []
        moisture_readings_dict[sensor_id].append({
            'moisture': reading.moisture,
            'created_at': reading.created_at
        })

    # Query the Plant table for plant_id using sensor_id
    plant_id_dict = {}
    for sensor_id in moisture_readings_dict.keys():
        plant = Plant.query.filter_by(sensor_id=sensor_id).first()
        plant_id_dict[sensor_id] = plant.plant_id if plant else None

    # Return a dictionary with moisture readings and corresponding plant_ids
    response_dict = {
        'moisture_readings': moisture_readings_dict,
        'plant_ids': plant_id_dict
    }

    return jsonify(response_dict)




@app.route('/conductivity-readings.json')
def view_conductivity_readings():

    # Query the conductivity readings for the last 24 hours
    conductivity_readings = db.session.query(
        SensorReading.sensor_id,
        SensorReading.conductivity,  # Change illuminance to conductivity
        SensorReading.created_at
    ).filter(
        SensorReading.created_at >= last_24_hours,
        SensorReading.conductivity.isnot(None)  # Change illuminance to conductivity
    ).order_by(SensorReading.created_at.desc()).all()

    # Grouping by sensor ID
    conductivity_readings_dict = {}
    for reading in conductivity_readings:
        sensor_id = reading.sensor_id

        if sensor_id not in conductivity_readings_dict:
            conductivity_readings_dict[sensor_id] = []
        conductivity_readings_dict[sensor_id].append({
            'conductivity': reading.conductivity,  # Change illuminance to conductivity
            'created_at': reading.created_at
        })

    # Query the Plant table for plant_id using sensor_id
    plant_id_dict = {}
    for sensor_id in conductivity_readings_dict.keys():
        plant = Plant.query.filter_by(sensor_id=sensor_id).first()
        plant_id_dict[sensor_id] = plant.plant_id if plant else None

    # Return a dictionary with conductivity readings and corresponding plant_ids
    response_dict = {
        'conductivity_readings': conductivity_readings_dict,  # Change light_readings to conductivity_readings
        'plant_ids': plant_id_dict
    }

    return jsonify(response_dict)



@app.route('/illuminance-readings.json')
def view_illuminance_readings():

    # Query the illuminance readings for the last 24 hours
    illuminance_readings = db.session.query(
        SensorReading.sensor_id,
        SensorReading.illuminance,
        SensorReading.created_at
    ).filter(
        SensorReading.created_at >= last_24_hours,
        SensorReading.illuminance.isnot(None)
    ).order_by(SensorReading.created_at.desc()).all()

    # Grouping by sensor ID
    illuminance_readings_dict = {}
    for reading in illuminance_readings:
        sensor_id = reading.sensor_id

        if sensor_id not in illuminance_readings_dict:
            illuminance_readings_dict[sensor_id] = []
        illuminance_readings_dict[sensor_id].append({
            'illuminance': reading.illuminance,
            'created_at': reading.created_at
        })

    # Query the Plant table for plant_id using sensor_id
    plant_id_dict = {}
    for sensor_id in illuminance_readings_dict.keys():
        plant = Plant.query.filter_by(sensor_id=sensor_id).first()
        plant_id_dict[sensor_id] = plant.plant_id if plant else None

    # Return a dictionary with illuminance readings and corresponding plant_ids
    response_dict = {
        'illuminance_readings': illuminance_readings_dict,
        'plant_ids': plant_id_dict
    }

    return jsonify(response_dict)



@app.route('/plantbook-query', methods=['POST'])
def plantbook_query():
    """
    Query the PlantBook API for plant data based on the provided plant ID (pid).
    Returns a JSON response containing the plant data.
    """
    
    data = request.get_json()
    pid = data.get('pid')
    
    print(data)
    print(pid)

    if not pid:
        return jsonify({'error': 'Missing "pid" in the request'}), 400

    plantbook_api = PlantBookAPI(os.environ["CLIENT_ID"], os.environ["CLIENT_SECRET"])


    plant_data = plantbook_api.get(f"/plant/detail/{urllib.parse.quote(pid)}/").json()
    return jsonify(plant_data)


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port=3000, debug=True)
