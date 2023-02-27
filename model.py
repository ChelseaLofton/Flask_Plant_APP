

class PlantSensor(db.Model):
    __tablename__ = "plant_sensors"







class Plantbook(db.Model):
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


class Plant(db.Model):
    __tablename__ = "plants"

    plant_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    pid = db.Column(db.String)
    sensor_id = db.Column(db.Integer)
    location_id = db.Column(db.String)

    plantbooks = db.relationship('Plantbook', backpopulates='plants' )
    climate_controls = db.relationship("ClimateControl", backpopulates='plants')
    plant_sensors = db.relationship('PlantSensor', backpopulates='plants')



class ClimateControl(db.Model):
    __tablename__ = "climate_controls"

    location_id = db.Column(db.String)

class HumiditySensor(db.Model):
    __tablename__ = 'humidity_sensors'
    