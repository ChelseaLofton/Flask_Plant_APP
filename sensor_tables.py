# import os
# import json

from flask_sqlalchemy import SQLAlchemy
from app import app

db = SQLAlchemy()


def connect_to_db(flask_app, db_uri="postgresql:///sensor_data", echo=False):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

    print("Connected to the db!")



class PlantSensor(db.Model):
    """Each plants individual sensor, via sensor id, back populates plants"""
    
    __tablename__ = 'plant_sensors'

    sensor_id = db.Column(db.String, primary_key=True)
    
    id = db.relationship('SensorReading', backref='plant_sensor', lazy= True)

    def __repr__(self):
        return f"<sensor_id = {self.sensor_id}>"



class SensorReading(db.Model):
    """Each sensors readings"""

    __tablename__ = 'sensor_readings'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    battery = db.Column(db.Integer, nullable = True)
    conductivity = db.Column(db.Integer)
    illuminance = db.Column(db.Integer)
    moisture = db.Column(db.Integer)
    plant_temperature = db.Column(db.Float)
    labeled_number = db.Column(db.Integer)

    sensor_id = db.relationship('PlantSensor', backref='plant_sensors')

    def __repr__(self):
        return f"<sensor_id = {self.sensor_id}, conductivity = {self.conductivity}, illuminance = {self.illuminance}, moisture = {self.moisture}>"



class Outlets(db.Model):
    """This table is for a ZigBee power strip which has a humdifier & light plugged in"""
    __tablename__ = "climate_controls"

    outlet_id = db.Column(db.String, primary_key = True)
    switch_id_2 = db.Column(db.String)
    switch_id_3 = db.Column(db.String)
    switch_id_4 = db.Column(db.String)
    switch_id_5 = db.Column(db.String)


    def __repr__(self):
        return f"<outlet_id={self.outlet_id}>"



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
    

if __name__ == "__main__":
    from app import app
    connect_to_db(app)