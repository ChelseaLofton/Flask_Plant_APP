from flask import (Flask, render_template, request, flash, session,
                    redirect)
from model import connect_to_db, db
import crud
from jinja2 import StrictUndefined





app = Flask(__name__)
app.secret_key = "ILovePlants"
app.jinja_env.undefined = StrictUndefined



@app.route('/')
def home():
    return "I love plants."







if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)