#!/usr/bin/env python
# coding: utf-8

# In[1]:


from bs4 import BeautifulSoup as bs
import requests
from splinter import Browser
import pandas as pd
import numpy as np
import time
import re
from ast import literal_eval


# In[2]:


executable_path = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless=False)


# In[3]:


aeropuertos = ["CUN","HAV","ORD","JFK","LAX","BCN","MAD","YYZ","MCO","SFO","LAS","MUC","YUL","MIA","DEN"] 
urls = []
for x in aeropuertos:
    amx_url = f"https://aeromexico.com/es-mx/reserva/opciones?itinerary=MEX_{x}_2019-11-15&leg=1&travelers=A1_C0_I0_PH0_PC0"
    urls.append(amx_url)
    print(amx_url)


# In[4]:


amx_data = []

for x in urls:
    browser.visit(x)
    time.sleep(20)
    try:
        browser.find_by_xpath("/html/body/div[2]/div/div/div[1]/div/div[1]/div/div/button").click()
    except:
        print("ok")
    amx_site = browser.html
    amx_soup = bs(amx_site, 'html.parser')
    options = amx_soup.find_all('div', class_="FlightOptionsListItem")
    print("appending")
    amx_data.append(options)


# In[5]:


precios = []
origenes = []
destinos = []
salidas = []
llegadas = []

for x in amx_data:
    for y in x:
        precio = y.find('div', class_='FlightOptionsFare-price')
        origen = y.find_all('div', class_='FlightOptionsTimeline-city')
        horario = y.find_all('div', class_='FlightOptionsTimeline-time')
        try:
            precios.append(precio.span.text.replace("$","").replace(",",""))
            origenes.append(origen[0].text)
            destinos.append(origen[1].text)
            salidas.append(horario[0])
            llegadas.append(horario[1])
        except:
            continue


# In[6]:


salidas2 = []

for x in salidas:
    try:
        salidas2.append(x.text)
    except:
        continue


# In[7]:


llegadas2 = []

for x in llegadas:
    try:
        llegadas2.append(x.text)
    except:
        continue


# In[8]:


df = pd.DataFrame({
"Origen": origenes,
"Destino": destinos,
"Hora_Salida": salidas2,
"Hora_Llegada": llegadas2,
"Desde": precios
})


# In[9]:


df["Desde"] = pd.to_numeric(df["Desde"])


# In[10]:


grouped_df = df.groupby(["Hora_Salida","Destino"])
amx_grouped = grouped_df.min()


# In[11]:


amx_grouped.reset_index(inplace=True)


# In[12]:


aeropuertos = ["CUN","HAV","ORD","JFK","LAX","BCN","MAD","YYZ","MCO","SFO","LAS","MUC","YUL","MIA","DEN"] 
urls = []
for x in aeropuertos:
    amx_url = f"https://sales.avianca.com/B2C/InicioAmadeus.aspx?cco=MEX&Pais=MX&lan=ES&tv=false&fi=15NOV&FFL=false&ccd={x}&fr=15NOV&Cabina=0&na=1&nn=0&ni=0&VInt=si&tt=4&ccorp=0&hvi=0&hvr=0&tarifa=0&SistemaOrigen=AH&FriendlyID=&FriendlyIDNegoF=&WS=&MPD=0&IvaMPD=0&descq=0&Device=web"
    urls.append(amx_url)
    print(amx_url)


# In[13]:


avi_prices = []
avi_horarios = []

for x in urls:
    browser.visit(x)
    time.sleep(20)
    avi_site = browser.html
    avi_soup = bs(avi_site, 'html.parser')
    avi_prices.append(avi_soup.find_all('div', class_='availability-list-fares'))
    avi_horarios.append(avi_soup.find_all('div', class_='flight-details availability-flight-details flight-details-without-button availability-flight-details-without-button row'))
    print("appending")


# In[14]:


precios = []

for x in avi_prices:
    for y in x:
        precios.append(y.find('div', class_='cell-reco-price').span.text.replace(",","").replace(".00",""))


# In[15]:


salidas = []
llegadas = []
origenes = []
destinos = []

for x in avi_horarios:
    for y in x:
        salidas.append(y.find('time', class_='time-from').text)
        llegadas.append(y.find('time', class_='time-to').text)
        origenes.append(y.find('abbr', class_='citycode-from').text.replace("(","").replace(")",""))
        destinos.append(y.find('abbr', class_='citycode-to').text.replace("(","").replace(")",""))


# In[16]:


df2 = pd.DataFrame({
"Origen": origenes,
"Destino": destinos,
"Hora_Salida": salidas,
"Hora_Llegada": llegadas,
"Desde": precios
})


# In[17]:


df2["Desde"] = [literal_eval(x) for x in df2["Desde"]]


# In[18]:


df2["Desde"] = pd.to_numeric(df2["Desde"])


# In[19]:


grouped_df2 = df2.groupby(["Hora_Salida", "Destino"])
avi_grouped = grouped_df2.min()


# In[20]:


avi_grouped.reset_index(inplace=True)


# In[21]:


aeropuertos = ["CUN","HAV","ORD","JFK","LAX","BCN","MAD","YYZ","MCO","SFO","LAS","MUC","YUL","MIA","DEN"]
urls = []
for x in aeropuertos:
    ua_url = f"https://www.united.com/ual/en/MX/flight-search/book-a-flight/results/rev?f=MEX&t={x}&d=2019-11-15&tt=1&sc=7&px=1&taxng=1&newHP=True&idx=1"
    urls.append(ua_url)
    print(ua_url)


# In[22]:


ua_data = []

for x in urls:
    browser.visit("https://www.united.com/en/mx/")
    time.sleep(5)
    browser.visit(x)
    time.sleep(20)
    united_site = browser.html
    united_soup = bs(united_site, 'html.parser')
    print("appending")
    ua_data.append(united_soup.find_all('li', class_='flight-block flight-block-fares use-roundtrippricing flight-block-revised'))


# In[23]:


salidas = []
llegadas = []
origenes = []
destinos = []
precios = []

for x in ua_data:
    for y in x:
        xx = y.find('div', class_='flight-time flight-time-depart').text
        xy = y.find('div', class_='flight-time flight-time-arrive').text
        xz = y.find_all('span')
        xw = (y.find('div', class_='price-point price-point-revised use-roundtrippricing').text)
        salidas.append(re.search(r'\d{1,2}(:\d{1,2})', xx).group())
        llegadas.append(re.search(r'\d{1,2}(:\d{1,2})', xy).group())
        origenes.append(xz[1].text)
        destinos.append(xz[3].text)
        precios.append(xw[25:-17].replace(',',''))


# In[24]:


precios2 = [x.strip(' ') for x in precios]


# In[25]:


df3 = pd.DataFrame({
"Origen": origenes,
"Destino": destinos,
"Hora_Salida": salidas,
"Hora_Llegada": llegadas,
"Desde": precios2
})
df3["Origen"] = df3["Origen"].str[-4:]
df3["Destino"] = df3["Destino"].str[-4:]
df3["Origen"] = df3["Origen"].str[:3]
df3["Destino"] = df3["Destino"].str[:3]
df3["Desde"] = pd.to_numeric(df3["Desde"])
df3.dropna(inplace=True)
df3["Desde"] = pd.to_numeric(df3["Desde"]).astype('float')
df3["Hora_Salida"] = df3["Hora_Salida"].apply('{0:0>5}'.format)
df3["Hora_Llegada"] = df3["Hora_Llegada"].apply('{0:0>5}'.format)


# In[28]:


df3["Desde"] = df3["Desde"] * 19.52 #revisa por que no puedes multiplicar con una variable


# In[30]:


df3["Desde"] = df3["Desde"].astype('int64')


# In[32]:


grouped_df3 = df3.groupby(["Hora_Salida", "Destino"])
ual_grouped = grouped_df3.min()


# In[33]:


ual_grouped.reset_index(inplace=True)


# In[34]:


amx_grouped["Name"] = "AMX"


# In[35]:


avi_grouped["Name"] = "AVI"


# In[36]:


ual_grouped["Name"] = "UAL"


# In[37]:


df4 = amx_grouped.append(avi_grouped, ignore_index=True)


# In[38]:


df5 = df4.append(ual_grouped, ignore_index = True)


# In[39]:


conditions = [
    (df5["Destino"] == "CUN"),
    (df5["Destino"] == "HAV"),
    (df5["Destino"] == "ORD"),
    (df5["Destino"] == "JFK"),
    (df5["Destino"] == "LAX"),
    (df5["Destino"] == "BCN"),
    (df5["Destino"] == "MAD"),
    (df5["Destino"] == "YYZ"),
    (df5["Destino"] == "MCO"),
    (df5["Destino"] == "SFO"),
    (df5["Destino"] == "LAS"),
    (df5["Destino"] == "MUC"),
    (df5["Destino"] == "YUL"),
    (df5["Destino"] == "MIA"),
    (df5["Destino"] == "DEN"),
    (df5["Destino"] == "YJB"),
    (df5["Destino"] == "EWR"),
    (df5["Destino"] == "LGA")
]

lat_choices = [21.040358,
               22.991455,
               41.974166,
               40.641235,
               33.941562,
               41.297781,
               40.498324,
               43.677764,
               28.431205,
               37.621313,
               36.084026,
               48.353598,
               45.465610,
               25.795814,
               39.856121,
               41.3789,
               40.689588,
               40.777065]

lon_choices = [-86.873455,
               -82.410321,
               -87.907300,
               -73.778263,
               -118.408412,
               2.083530,
               -3.567469,
               -79.624959,
               -81.308008,
               -122.378988,
               -115.153889,
               11.775135,
               -73.745299,
               -80.287169,
               -104.673641,
               2.1400,
               -74.174430,
               -73.873987]


# In[40]:


df5["Lat"] = np.select(conditions, lat_choices, default="N/A")


# In[41]:


df5["Lon"] = np.select(conditions, lon_choices, default="N/A")


# In[42]:


df5.to_csv("consolidated.csv")


# In[43]:


df5.to_json("consolidated_json.js", orient="records")


# In[44]:


from sqlalchemy import create_engine, inspect, func, MetaData
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
db_string = "postgres://dgvhnhvgmlvyas:9ec80f4b1f38b037e7f4ec194639c23e0a51391ba0125294f6cdc29afbfe2c91@ec2-54-235-86-101.compute-1.amazonaws.com:5432/ddjlbrhg56vtvf"
db = create_engine(db_string)


# In[47]:


tables = db.table_names()
print(tables)


# In[48]:


day = input("Select a table (i.e. oct01): ")


# In[49]:


df5.to_sql(name=day, con=db, if_exists='append', index=False)


# In[ ]:




