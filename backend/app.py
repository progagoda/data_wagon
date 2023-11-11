from flask import Flask
import pandas as pd
from flask_cors import CORS, cross_origin
from geopandas import (
    GeoDataFrame,
    overlay,
)  # Импорт класса GeoDataFrame и функции overlay из модуля geopandas
import osmnx as ox
from shapely.geometry import box

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

station_coords = pd.read_excel(
    "C:\\Users\\Artem.Brudar\\Documents\\ITMO\\Hackatons\\data_wagon\\PyMt\\STATION_COORDS_HACKATON.xlsx"
)
disl = pd.read_excel(
    "C:\\Users\\Artem.Brudar\\Documents\\ITMO\\Hackatons\\data_wagon\\PyMt\\disl_hackaton.xlsx"
)
peregon = pd.read_excel(
              "C:\\Users\\Artem.Brudar\\Documents\\ITMO\\Hackatons\\data_wagon\\PyMt\\PEREGON_HACKATON.xlsx"
          )
json_data = peregon[['START_CODE', 'END_CODE']].values.tolist()
station_coords = station_coords.dropna()
nan_rows = disl[disl.isnull().any(axis=1)]

# Сортировка данных по столбцу OPERDATE
sorted_df = disl.sort_values(by="OPERDATE")

# Группировка данных по столбцу OPERDATE
grouped_df = sorted_df.groupby("OPERDATE")
first_data_input = sorted_df[0:100].reset_index()

first_data_input["OPERDATE"] = pd.to_datetime(first_data_input["OPERDATE"])

# 1. Взять самую новую информацию по каждому вагону
latest_data = (
    first_data_input.sort_values(by="OPERDATE", ascending=False)
    .groupby("WAGNUM")
    .head(1)
)
json_data = peregon[['START_CODE', 'END_CODE']].values.tolist()

print(json_data)
current_locations = []
for index, row in latest_data.iterrows():
    try:
        if value := station_coords.loc[
            station_coords["ST_ID"] == row["ST_ID_DISL"]
        ].values.tolist()[0]:
            if not isinstance(value[0], list):
                ST_ID, LATITUDE, LONGITUDE = value
                current_locations.append(
                    {
                        "station": {
                            "ST_ID": ST_ID,
                            "LATITUDE": LATITUDE,
                            "LONGITUDE": LONGITUDE,
                        },
                        "wagnum": {
                            "WAGNUM": row["WAGNUM"],
                            "OPERDATE": row["OPERDATE"],
                            "ST_ID_DISL": row["ST_ID_DISL"],
                            "ST_ID_DEST": row["ST_ID_DEST"],
                            "TRAIN_INDEX": row["TRAIN_INDEX"],
                        },
                    }
                )
    except:
        pass

minx, miny, maxx, maxy = (
    station_coords["LONGITUDE"].min(),
    station_coords["LATITUDE"].min(),
    station_coords["LONGITUDE"].max(),
    station_coords["LATITUDE"].max(),
)
rectangle = box(minx, miny, maxx, maxy)


@app.route("/api/stations")
@cross_origin()
def stations():
    return station_coords.dropna().values.tolist()


@app.route("/api/wagnums")
@cross_origin()
def vagnums():
    return current_locations

@app.route("/api/peregon")
@cross_origin()
def peregon():
    return json_data

if __name__ == "__main__":
    app.run()
