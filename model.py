"""Models for tables"""

from flask_sqlalchemy import SQLAlchemy

class PlantSensor(db.Model):
    """Each plants individual sensor, via sensor id, back populates plants"""
    
    __tablename__ = "plant_sensors"

    sensor_id = db.Column(db.String, primary_key=True)
    battery = db.Column(db.Integer, nullable = True)
    conductivity = db.Column(db.Integer)
    illuminance = db.Column(db.Integer)
    moisture = db.Column(db.Integer)
    plant_temperature = db.Columb(db.Float)
    labeled_number = db.Columndb.Integer


    def __repr__(self):
        return f"<sensor_id = {self.sensor_id}, conductivity = {self.conductivity}, illuminance = {self.illuminance}>"



class Plantbook(db.Model):
    """Is a database of tolerance values vie pid will back populate plants"""
    __tablename__ = "plantbooks"

    pid = db.Column(db.String, primary_key=True)
    display_pid = db.Column(db.String)
    alias = db.Column(db.String)
    category = db.Column(db.String)
    max_light_mmol = db.Column(db.Integer)  
    min_light_mmol = db.Column(db.Integer)  
    max_light_lux = db.Column(db.Integer)  
    min_light_lux = db.Column(db.Integer)  
    max_temp = db.Column(db.Integer)  
    min_temp = db.Column(db.Integer)  
    max_env_humid = db.Column(db.Integer)  
    min_env_humid = db.Column(db.Integer)  
    max_soil_moist = db.Column(db.Integer)  
    min_soil_moist = db.Column(db.Integer)  
    max_soil_ec = db.Column(db.Integer)  
    min_soil_ec = db.Column(db.Integer)  
    image_url = db.Column(db.Integer)  

    def __repr__(self):
        return f"<pid = {self.pid} and alias = {self.alias}>"


class Plant(db.Model):
    """This table is for each individual plant, unique plant_id, pid references plantbook"""
    """sensor_id is each plants individual sensor, location_id references the power strip location"""
    __tablename__ = "plants"

    plant_id = db.Column(db.Integer, autoincrement=True, primary_key=True)

    pid = db.relationship('Plantbook', backpopulates='plants' )
    location_id = db.relationship("ClimateControl", backpopulates='plants')
    sensor_id = db.relationship('PlantSensor', backpopulates='plants')

    def __repr__(self):
        return f"<plant_id = {self.plant_id}>"


class ClimateControl(db.Model):
    """This table is for a ZigBee power strip which has a humdifier & light plugged in"""
    __tablename__ = "climate_controls"

    location_id = db.Column(db.String, primary_key = True)
    sensor_id = db.Column(db.String)
    hum_port = db.Column(db.Intger)
    light_port = db.Column(db.Integer)


    def __repr__(self):
        return f"<location_id={self.location_id}>"

class HumiditySensor(db.Model):
    """This is a table for an individual temp/hum sensor which backpopulates the climate"""
    """control via location_id. (These are currently working attribute names, not actual)"""
    __tablename__ = 'humidity_sensors'

    humidity_sensor_id = db.Column(db.String, primary_key = True)
    humidity = db.Column(db.Float)
    pressure = db.Column(db.Float)
    temperature = db.Column(db.Float)
    battery = db.Column(db.Integer)


    def __repr__(self):
        return f"<location_id = {self.location_id}, humidity={self.humidity}, temperature={self.temperature},  battery={self.battery}>"