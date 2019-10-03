import os

import sqlalchemy
from sqlalchemy import create_engine, inspect, func, MetaData
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db_string = "postgres://postgres:pkmn.2012@localhost:5432/Air_Analytics"
db = create_engine(db_string)

session = Session(db)
meta = MetaData()
meta.reflect(bind=db)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/day/<day>")
def test(day):
    
    choice = meta.tables[day]
    
    query = session.query(
    choice.columns.Hora_Salida,
    choice.columns.Destino,
    choice.columns.Origen, 
    choice.columns.Hora_Llegada,
    choice.columns.Desde,
    choice.columns.Name,
    choice.columns.Lat,
    choice.columns.Lon
    ).\
    all()
    
    return jsonify(query)

if __name__ == "__main__":
    app.run()