"""Models for tables"""

from flask_sqlalchemy import SQLAlchemy
from app import app

db = SQLAlchemy()


def connect_to_db(flask_app, db_uri="postgresql:///sensor_data", echo=False):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


class Plantbook(db.Model):
    """Is a database of tolerance values vie pid will back populate plants"""
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
    image_url = db.Column(db.Integer)  

    
    def __repr__(self):
        return f"<pid = {self.pid} and alias = {self.alias}>"



class Plant(db.Model):
    """This table is for each individual plant, unique plant_id, pid references plantbook"""
    """sensor_id is each plants individual sensor, location_id references the power strip location"""
    __tablename__ = "plants"

    plant_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    # pid = db.Column(db.String, db.foreignKey('plantbooks.pid'))

    pid= db.relationship('Plantbook', backref='plants')
    outlet_id = db.relationship("Outlets", backref='plants', nullable=True)
    humidity_sensor_id = db.relationship("HumiditySensor", backref='plants')
    sensor_id = db.relationship('PlantSensor', backref='plants')

    def __repr__(self):
        return f"<plant_id = {self.plant_id}>"


if __name__ == "__main__":
    from plants import app
    connect_to_db(app)