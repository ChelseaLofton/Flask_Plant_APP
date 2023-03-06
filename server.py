from flask import (Flask, render_template, request, flash, session,
                    redirect)
from model import connect_to_db, db
import crud
from jinja2 import StrictUndefined


app = Flask(__name__)
app.secret_key = "ILovePlants"
app.jinja_env.undefined = StrictUndefined



@app.route('/')
def homepage():
    
    
    return render_template('homepage.html')

@app.route('/sensors')
def view_all_sensors():
    """View all sensors."""

    sensors = crud.create_sensor_readings()

    return render_template('all_sensors.html', sensors=sensors)







if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)