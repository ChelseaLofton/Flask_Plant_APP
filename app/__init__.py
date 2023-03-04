from flask import Flask

app = Flask(__name__)
app.config.update({
  "SQLALCHEMY_DATABASE_URI": "postgresql:///project_data",
  "SQLALCHEMY_ECHO": False,
  "SQLALCHEMY_TRACK_MODIFICATIONS": False,  
})

# from .routes import * 
# from .commands import *
