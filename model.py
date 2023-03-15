from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class PlantBook(db.Model):
    """Is a database of tolerance values via pid will back populate plants"""
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
    """This table is for each individual plant, unique plant_id, pid references plantbook"""
    """sensor_id is each plants individual sensor, location_id references the power strip location"""
    __tablename__ = "plants"

    plant_id = db.Column(db.String, primary_key=True)
    pid = db.Column(db.String, db.ForeignKey('plantbooks.pid'))
    sensor_id = db.Column(db.String, db.ForeignKey('plant_sensors.sensor_id'))

    def __repr__(self):
        return f"<plant_id = {self.plant_id}>"

    def to_dict(obj):
        return {
            "plant_id": self.plant_id,
            "pid": self.pid,
            "sensor_id": self.sensor_id
        }


class PlantSensor(db.Model):
    """Each plants individual sensor, via sensor id, back populates plants"""

    __tablename__ = 'plant_sensors'

    sensor_id = db.Column(db.String, primary_key=True)

    plant_id = db.relationship('Plant', backref='plant_sensor', lazy=True)
    readings = db.relationship('SensorReading', backref='plant_sensor', lazy=True)

    def __repr__(self):
        return f"<sensor_id = {self.sensor_id}>"


class SensorReading(db.Model):
    """Each sensors readings"""

    __tablename__ = 'sensor_readings'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    battery = db.Column(db.Integer, nullable=True)
    conductivity = db.Column(db.Integer)
    illuminance = db.Column(db.Integer)
    moisture = db.Column(db.Integer)
    temperature = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=db.func.utcnow())

    sensor_id = db.Column(db.String, db.ForeignKey('plant_sensors.sensor_id'))

    def __repr__(self):
        return f"<sensor_id = {self.sensor_id}, conductivity = {self.conductivity}, illuminance = {self.illuminance}, moisture = {self.moisture}>"


class Outlet(db.Model):
    """This table is for a ZigBee power strip which has a humdifier & light plugged in"""
    __tablename__ = "outlets"

    outlet_id = db.Column(db.String, primary_key=True)
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

    humidity_sensor_id = db.Column(db.String, primary_key=True)

    readings = db.relationship('HumidityReading', backref='humidity_sensor', lazy=True)

    def __repr__(self):
        return f"<sensor_id = {self.humidity_sensor_id}>"


class HumidityReading(db.Model):

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


def connect_to_db(flask_app, db_uri="postgresql:///project_data", echo=True):
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
