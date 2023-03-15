
from model import db, PlantBook, PlantSensor, SensorReading, HumidityReading, HumiditySensor, Outlet, connect_to_db
from model import Plant


def create_plant(plant_id, pid, sensor_id):
    plant_id = Plant(
        plant_id=plant_id,
        pid=pid,
        sensor_id=sensor_id,
    )

    return plant_id


def create_plant_data(pid, display_pid, alias, category, max_light_lux,
        min_light_lux, max_temp, min_temp, max_env_humid, min_env_humid,
        max_soil_moist, min_soil_moist, max_soil_ec, min_soil_ec, image_url):

    pid = PlantBook(
        pid=pid,
        display_pid=display_pid,
        alias=alias,
        category=category,
        max_light_lux=max_light_lux,
        min_light_lux=min_light_lux,
        max_temp=max_temp,
        min_temp=min_temp,
        max_env_humid=max_env_humid,
        min_env_humid=min_env_humid,
        max_soil_moist=max_soil_moist,
        min_soil_moist=min_soil_moist,
        max_soil_ec=max_soil_ec,
        min_soil_ec=min_soil_ec,
        image_url=image_url
    )
    return pid


def create_plant_sensors(sensor_id,):

    sensor_id = PlantSensor(
        sensor_id=sensor_id,
    )
    return sensor_id


def create_sensor_readings(battery, illuminance, conductivity,
        moisture, temperature, created_at, sensor_id):

    try:
        if battery is not None:
            battery = int(battery)
    except ValueError:
        battery = None

    id = SensorReading(
        battery=battery,
        illuminance=illuminance,
        conductivity=conductivity,
        moisture=moisture,
        temperature=temperature,
        created_at=created_at,
        sensor_id=sensor_id


    )
    return id


def create_outlets(outlet_id, switch_id_2, switch_id_3, switch_id_4,
        switch_id_5):

    outlet_id = Outlet(
        outlet_id=outlet_id,
        switch_id_2=switch_id_2,
        switch_id_3=switch_id_3,
        switch_id_4=switch_id_4,
        switch_id_5=switch_id_5
    )
    return outlet_id


def create_humidity_sensor(humidity_sensor_id, battery, humidity, pressure,
        temperature):

    humidity_sensor_id = HumiditySensor(
        humidity_sensor_id=humidity_sensor_id,
    )
    return humidity_sensor_id


def create_humidity_readings(humidity, pressure, temperature,
        battery, created_at, sensor_id):

    try:
        if battery is not None:
            battery = int(battery)
    except ValueError:
        battery = None

    id = HumidityReading(
        battery=battery,
        humidity=humidity,
        pressure=pressure,
        temperature=temperature,
        created_at=created_at,
        sensor_id=sensor_id,
    )

    return id


if __name__ == "main":
    from server import app
    connect_to_db(app, echo=False)
