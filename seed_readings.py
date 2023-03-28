"""
This script collects sensor data and populates the database with the readings.
It is run on a cron tab every 5 minutes to collect data at a steady rate.

Language: Python
Frameworks/Libraries: Flask-SQLAlchemy
Database: SQLAlchemy
"""

from hass import get_plant_sensors, get_humidity_sensors
import model 
import crud
import server
from datetime import datetime

model.connect_to_db(server.app)


def run_seed():
    """
    Run the seed functions for sensor readings and humidity readings.
    """
    print("Running seed functions")
    seed_readings()
    seed_humidity_readings()
    print("Finished seeding")

def seed_readings():
    """
    Populate the database with sensor readings.
    """
    print("Seeding readings")
    sensor_data = get_plant_sensors()

    for sensor_id, sensor_reading in sensor_data.items():
        illuminance, conductivity, moisture, temperature, battery = (
            sensor_reading['illuminance'],
            sensor_reading['conductivity'],
            sensor_reading['moisture'],
            sensor_reading['temperature'],
            sensor_reading['battery'] if 'battery' in sensor_reading else None,
        )

        new_sensor_data = crud.create_sensor_readings(battery=battery, illuminance=illuminance, conductivity=conductivity,
            moisture=moisture, temperature=temperature, created_at=datetime.utcnow(), sensor_id=sensor_id)

        model.db.session.merge(new_sensor_data)
        model.db.session.commit()

def seed_humidity_readings():
    """
    Populate the database with humidity readings.
    """

    print("Seeding humidity readings")
    humidity_data = get_humidity_sensors()  
    
    for humidity_sensor_id, sensor_reading in humidity_data.items():
        humidity, pressure, temperature, battery = (
            sensor_reading['humidity'],
            sensor_reading['pressure'],
            sensor_reading['temperature'],
            sensor_reading['battery'] if 'battery' in sensor_reading else None,
        )

        new_humidity_data = crud.create_humidity_readings(battery=battery, pressure=pressure, humidity=humidity, temperature=temperature, 
                created_at=datetime.utcnow(), humidity_sensor_id=humidity_sensor_id)

        model.db.session.merge(new_humidity_data)
        model.db.session.commit()


# Run the seed functions
run_seed()

# Uncomment the following lines if you want to use the schedule library to run the seed functions periodically
# import time
# import schedule 
# schedule.every(5).minutes.do(run_seed)
# while True:
#     print("Running schedule")
#     schedule.run_pending()
#     time.sleep(1)