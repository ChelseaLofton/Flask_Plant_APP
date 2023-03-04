from flask import Flask
import click
from flask.cli import with_appcontext

from plants import app  

@click.command(name='seed-sensors')
@with_appcontext
def seed_sensors():
    print("Hello, I am seeding sensors")