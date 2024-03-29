"""
This script defines the database models and relationships for a plant monitoring system using
Flask-SQLAlchemy.

Language: Python
Libraries: flask_sqlalchemy, datetime
"""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()



class PlantBook(db.Model):
    """
    A database of tolerance values for various plants, identified by pid. Each PlantBook entry
    can be associated with multiple Plant instances.
    """
    __tablename__ = "plantbooks"

    pid = db.Column(db.String, primary_key=True)
    display_pid = db.Column(db.String)
    alias = db.Column(db.String)
    category = db.Column(db.String)
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
    image_url = db.Column(db.String, nullable=True)

    def __repr__(self):
        return f"<pid = {self.pid} and alias = {self.alias}>"

    def to_dict(self):
        return {
            "pid": self.pid,
            "display_pid": self.display_pid,
            "alias": self.alias,
            "category": self.category,
            "max_light_lux": self.max_light_lux,
            "min_light_lux": self.min_light_lux,
            "max_temp": self.max_temp,
            "min_temp": self.min_temp,
            "max_env_humid": self.max_env_humid,
            "min_env_humid": self.min_env_humid,
            "max_soil_moist": self.max_soil_moist,
            "min_soil_moist": self.min_soil_moist,
            "max_soil_ec": self.max_soil_ec,
            "min_soil_ec": self.min_soil_ec,
            "image_url": self.image_url
        }

    def __repr__(self):
        return f"<pid = {self.pid} and alias = {self.alias}>"


class Plant(db.Model):
    """
    Represents an individual plant with a unique plant_id. pid references the PlantBook table,
    and sensor_id references the PlantSensor table.
    """

    __tablename__ = "plants"

    plant_id = db.Column(db.String, primary_key=True)
    pid = db.Column(db.String, db.ForeignKey('plantbooks.pid'))
    sensor_id = db.Column(db.String, db.ForeignKey('plant_sensors.sensor_id'))

    def __repr__(self):
        return f"<plant_id = {self.plant_id}>"

    def to_dict(self):
        return {
            "plant_id": self.plant_id,
            "pid": self.pid,
            "sensor_id": self.sensor_id
        }


class PlantSensor(db.Model):
    """
    Represents an individual sensor for a plant, identified by sensor_id. Each PlantSensor can
    be associated with multiple SensorReading instances.
    """

    __tablename__ = 'plant_sensors'

    sensor_id = db.Column(db.String, primary_key=True)

    plant_id = db.relationship('Plant', backref='plant_sensor', lazy=True)
    readings = db.relationship('SensorReading', backref='plant_sensor', lazy=True)

    def __repr__(self):
        return f"<sensor_id = {self.sensor_id}>"


class SensorReading(db.Model):
    """
    Represents a sensor reading for a plant, containing data such as battery, conductivity,
    illuminance, moisture, and temperature.
    """

    __tablename__ = 'sensor_readings'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    battery = db.Column(db.Integer, nullable=True)
    conductivity = db.Column(db.Integer)
    illuminance = db.Column(db.Integer)
    moisture = db.Column(db.Integer)
    temperature = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=db.func.utcnow())

    sensor_id = db.Column(db.String, db.ForeignKey('plant_sensors.sensor_id'))

    def to_dict(self):
        return {
            'id': self.id,
            'battery': self.battery,
            'conductivity': self.conductivity,
            'illuminance': self.illuminance,
            'moisture': self.moisture,
            'temperature': self.temperature,
            'created_at': self.created_at.isoformat(),
            'sensor_id': self.sensor_id,
        }

    def __repr__(self):
        return f"<sensor_id = {self.sensor_id}, conductivity = {self.conductivity}, illuminance = {self.illuminance}, moisture = {self.moisture}>"


class Outlet(db.Model):
    """
    Represents a ZigBee power strip with multiple switches. Each Outlet can be associated with
    a humidifier and a light.
    """
    __tablename__ = "outlets"

    outlet_id = db.Column(db.String, primary_key=True)
    switch_id_2 = db.Column(db.String)
    switch_id_3 = db.Column(db.String)
    switch_id_4 = db.Column(db.String)
    switch_id_5 = db.Column(db.String)

    def __repr__(self):
        return f"<outlet_id={self.outlet_id}>"


class HumiditySensor(db.Model):
    """
    Represents an individual temperature and humidity sensor. Each HumiditySensor can be
    associated with multiple HumidityReading instances.
    """
    __tablename__ = 'humidity_sensors'

    humidity_sensor_id = db.Column(db.String, primary_key=True)

    readings = db.relationship('HumidityReading', backref='humidity_sensor', lazy=True)

    def __repr__(self):
        return f"<sensor_id = {self.humidity_sensor_id}>"


class HumidityReading(db.Model):
    """
    Represents a reading from a temperature and humidity sensor, containing data such as
    humidity, pressure, temperature, and battery.
    """

    __tablename__ = 'humidity_readings'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    humidity = db.Column(db.Float)
    pressure = db.Column(db.Float)
    temperature = db.Column(db.Float)
    battery = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=db.func.utcnow())

    humidity_sensor_id = db.Column(db.String, db.ForeignKey('humidity_sensors.humidity_sensor_id'))

    def __repr__(self):
        return f"<humidity_sensor_id = {self.humidity_sensor_id}, humidity={self.humidity}, pressure={self.pressure} temperature={self.temperature},  battery={self.battery}>"

    def to_dict(self):
        return {
            'id': self.id,
            'humidity': self.humidity,
            'pressure': self.pressure,
            'temperature': self.temperature,
            'battery': self.battery,
            'created_at': self.created_at.isoformat(),
            'humidity_sensor_id': self.humidity_sensor_id,
        }

def connect_to_db(flask_app, db_uri="postgresql:///project_data", echo=True):
    """
    Connects the Flask app to the database.
    """
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app
    with app.app_context():
        connect_to_db(app)
