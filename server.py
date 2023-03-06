from flask import (Flask, render_template, request, flash, session,
                    redirect)
from model import connect_to_db, db, Plant, PlantBook, PlantSensor, SensorReading, HumiditySensor, Outlet
import crud
from jinja2 import StrictUndefined
from sensors import get_plant_sensors, get_humidity_sensors, get_outlets


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
    
    plant_name = plant.plant_id[:-3]
    sensor_id = plant.plant_id[-2:]     

    plant_data = PlantBook.query.filter_by(pid = plant_id).all()


    return render_template('view_plant_data.html',sensor_id = sensor_id, plant_name = plant_name, plant_data=plant_data)



@app.route('/sensors')
def view_all_sensors():
    """View all sensors."""
    
    sensors = PlantSensor.query.all()

    return render_template('view_all_sensors.html', sensors = sensors)



@app.route('/sensors/<sensor_id>')
def view_sensors_data(sensor_id):
    """View all sensor readings for a specific sensor."""
    # Update with most recent sensor readings

    sensor = PlantSensor.query.filter_by(sensor_id=sensor_id).first()

    sensor_readings = SensorReading.query.filter_by(sensor_id=sensor_id).all()


    return render_template('view_sensor_readings.html', sensor=sensor, sensor_readings = sensor_readings)







if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)


