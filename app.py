import os

import sqlalchemy
from sqlalchemy import create_engine, inspect, func, MetaData
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db_string = "postgres://postgres:adriana@localhost:5432/Air_Analytics"
db = create_engine(db_string)

session = Session(db)
meta = MetaData()
meta.reflect(bind=db)

app.config["SECRET_KEY"] = "mysecretkey"



@app.route("/index.html")
def inicio():
    return render_template("index.html")


@app.route("/charts.html")
def charts():
    return render_template("charts.html")


@app.route("/map.html")
def map():
    return render_template("map.html")


@app.route("/table.html")
def table():
    return render_template("table.html")

@app.route("/")
@app.route("/home.html")
def home():
    return render_template("home.html")

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

@app.errorhandler(404)
@app.route("/error.html")
def page_not_found(e):
    return render_template("404.html"), 404



# @app.route("/acerca")
# def acerca():
#     return render_template("acerca.html")


if __name__ == "__main__":
    app.run(debug=True)

