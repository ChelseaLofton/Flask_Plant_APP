
from hass import Client, get_plant_sensors
import model 
import crud
import server
from datetime import datetime
import time
import schedule 





# model.connect_to_db(server.app)


# def seed_readings():
#     sensor_data = get_plant_sensors()       # from sensors.py queires the HomeAssist API for the sensor data


#     for sensor_id, sensor_reading in sensor_data.items():
#         illuminance, conductivity, moisture, temperature, battery = (
#             sensor_reading['illuminance'],
#             sensor_reading['conductivity'],
#             sensor_reading['moisture'],
#             sensor_reading['temperature'],
#             sensor_reading['battery'] if 'battery' in sensor_reading else None,
#         )

#         new_sensor_data = crud.create_sensor_readings(battery=battery, illuminance=illuminance, conductivity=conductivity,
#             moisture=moisture, temperature=temperature, created_at=datetime.utcnow(), sensor_id=sensor_id)

#         model.db.session.merge(new_sensor_data)
#         model.db.session.commit()


# schedule.every().hour.do(seed_readings)

# while True:
#     schedule.run_pending()
#     time.sleep(1)
