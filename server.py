from flask import (Flask, render_template, request, flash, session,
                    redirect)

from jinja2 import StrictUndefined
from sensors import get_plant_sensors, get_humidity_sensors, get_outlets
from model import db, connect_to_db, Plant, PlantBook, PlantSensor, \
SensorReading, Outlet, HumiditySensor



app = Flask(__name__)
app.secret_key = "ILovePlants"
app.jinja_env.undefined = StrictUndefined



@app.route('/')
def homepage():
    
    return render_template('homepage.html')



@app.route('/plants')
def view_all_plants():
    """View all plants."""

    plants = Plant.query.all()


    return render_template('view_all_plants.html', plants = plants)



@app.route('/plants/<plant_id>')
def view_plant_data(plant_id):
    """View a specific plant."""

    plant = Plant.query.filter_by(plant_id=plant_id).first()
    sensor_id = PlantSensor.query.filter_by(sensor_id = plant.sensor_id).first()
    plant_data = PlantBook.query.filter_by(pid = plant.pid).all()
    sensor_readings = SensorReading.query.filter_by(sensor_id = plant.sensor_id).all()




    return render_template('view_plant_data.html', sensor_id=sensor_id, 
    plant=plant, plant_data=plant_data, sensor_readings=sensor_readings)



@app.route('/sensors')
def view_all_sensors():
    """View all sensors."""
    
    sensors = PlantSensor.query.all()
    

    return render_template('view_all_sensors.html', sensors=sensors)



@app.route('/sensor/<sensor_id>')
def view_sensors_data(sensor_id):
    """View all sensor readings for a specific sensor."""
    # Update with most recent sensor readings

    sensor = PlantSensor.query.filter_by(sensor_id=sensor_id).first()

    sensor_readings = SensorReading.query.filter_by(sensor_id=sensor_id).all()


    return render_template('view_sensor_readings.html', sensor=sensor, sensor_readings = sensor_readings)



@app.route('/climate_controls')
def view_climate_controls():
    """View all climate controls."""

    outlets = Outlet.query.all()
    humidity_sensors = HumiditySensor.query.all()

    return render_template('view_climate_controls.html', outlets=outlets, humidity_sensors=humidity_sensors)

def toggleSwitch(switchId, switchState, setSwitchState):
    """Toggle switch on/off."""
    # Update with most recent sensor readings

    if switchState == 0:
        setSwitchState = 1
    else:
        setSwitchState = 0

    return setSwitchState
    


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)


