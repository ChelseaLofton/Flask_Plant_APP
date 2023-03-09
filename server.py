from flask import (Flask, render_template, request, flash, session,
        redirect, jsonify)
from flask_sqlalchemy import SQLAlchemy
from jinja2 import StrictUndefined
from sensors import get_plant_sensors, get_humidity_sensors, get_outlets, set_outlet_state
from model import (db, connect_to_db, Plant, PlantBook, PlantSensor, \
    SensorReading, Outlet, HumiditySensor)


app = Flask(__name__)
app.secret_key = "ILovePlants"
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():

    return render_template('index.html')


@app.route('/plants')
def view_all_plants():
    """View all plants."""

    plants = Plant.query.all()

    return render_template('view_all_plants.html', plants=plants)


@app.route('/plants/<plant_id>')
def view_plant_data(plant_id):
    """View a specific plant."""

    plant = Plant.query.filter_by(plant_id=plant_id).first()
    # sensor_id = PlantSensor.query.filter_by(sensor_id=plant.sensor_id).first()
    # plant_data = PlantBook.query.filter_by(pid=plant.pid).all()
    # sensor_readings = get_plant_sensors().get(sensor_id)

    return jsonify(plant=plant)
# , plant_data=plant_data, sensor_readings=sensor_readings)
    # return render_template('view_plant_data.html', sensor_id=sensor_id,
    #     plant=plant, plant_data=plant_data, sensor_readings=sensor_readings)


@app.route('/sensors.json')
def view_all_sensors():
    """View all sensors."""

    sensors = PlantSensor.query.all()


    return sensors



@app.route('/sensors/<sensor_id>.json')
def get_sensor_data(sensor_id):
    """View all sensor readings for a specific sensor."""
    # Update with most recent sensor readings

    # sensor = PlantSensor.query.filter_by(sensor_id=sensor_id).first()
    sensor_data = get_plant_sensors().get(sensor_id)

    if sensor_data:
        return jsonify(sensor_data)
    else:
        return jsonify({"error": "Sensor not found."})


@app.route('/climate_controls')
def view_climate_controls():
    """View all climate controls."""

    outlets = get_outlets()
    humidity_sensors = get_humidity_sensors()

    return render_template('view_climate_controls.html', outlets=outlets, humidity_sensors=humidity_sensors)


@app.route("/change_state.json", methods=['POST'])  # incomplete
def set_outlet_state():
    """Toggle switch on/off."""

    outlet_id = request.json.get('outlet_id')
    switch_id = request.json.get('switch_id')
    state = request.json.get('state')

    set_outlet_state(outlet_id, switch_id, state)

    return jsonify({"success": True})


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port=3000, debug=True)
