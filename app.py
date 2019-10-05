import os

import sqlalchemy
from sqlalchemy import create_engine, inspect, func, MetaData
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db_string = "postgres://dgvhnhvgmlvyas:9ec80f4b1f38b037e7f4ec194639c23e0a51391ba0125294f6cdc29afbfe2c91@ec2-54-235-86-101.compute-1.amazonaws.com:5432/ddjlbrhg56vtvf"
db = create_engine(db_string)

session = Session(db)
meta = MetaData()
meta.reflect(bind=db)


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

@app.route("/map/<day>/<destino>")
def plane(day, destino):
    
    choice = meta.tables[day]

    query2 = session.query(
    choice.columns.Destino,
    choice.columns.Hora_Salida,
    choice.columns.Desde,
    choice.columns.Name
    ).\
    filter(choice.columns.Destino == destino).order_by(choice.columns.Desde).all() #hay que convertir los precios de UAL a pesos para ya no meter condicionales
    
    return jsonify(query2[0])    

@app.errorhandler(404)
@app.route("/error.html")
def page_not_found(e):
    return render_template("404.html"), 404



# @app.route("/acerca")
# def acerca():
#     return render_template("acerca.html")


if __name__ == "__main__":
    app.run(debug=True)

