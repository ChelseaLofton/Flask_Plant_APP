from model import db, Plant, PlantBook, PlantSensor, SensorReading, HumiditySensor, Outlets


def create_plant(plant_id, pid, outlet_id, humidity_sensor_id, sensor_id):
    plant_id = Plant(
        plant_id=plant_id,
        pid=pid,
        outlet_id=outlet_id,
        humidity_sensor_id=humidity_sensor_id,
        sensor_id=sensor_id,
    )


def create_plantbook_data(pid, display_pid, alias, category, max_light_lux,
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

def create_plant_sensors(sensor_id, id):

    sensor_id = PlantSensor(
        sensor_id=sensor_id,
        id=id
    )

def create_sensor_readings(id, battery, illuminance, conductivity, 
    moisture, temperature, sensor_id):

    id = SensorReading(
        id=id,
        battery = battery,
        illuminance = illuminance,
        conductivity = conductivity,
        moisture = moisture,
        temperature = temperature,
        sensor_id = sensor_id
    )

def create_outlets(outlet_id, switch_id_2, switch_id_3, switch_id_4, 
    switch_id_5):

    outlet_id = Outlets(
        outlet_id = outlet_id,
        switch_id_2 = switch_id_2,
        switch_id_3 = switch_id_3,
        switch_id_4 = switch_id_4,
        switch_id_5 = switch_id_5
    )

def create_humidity_sensor(humidity_sensor_id, battery, humidity, pressure, 
    temperature):

    humidity_sensor_id = HumiditySensor(
        humidity_sensor_id =humidity_sensor_id,
        battery = battery,
        humidity = humidity,
        pressure = pressure,
        temperature = temperature
    )
    
# if __name__ == "main":
#     from server import app
#     connect_to_db(app, echo=False)
