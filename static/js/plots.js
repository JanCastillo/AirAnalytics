var destination = d3.select("#destination");
var day = d3.select("#day");
var table_day = d3.select("#table-day");
var airline = d3.select("#airline");

var filter = d3.select("#filter");
var add = d3.select("#add");
var table_data = d3.select("#table_data");

table_data.on("click", function(){
    let day_value = table_day.property("value");
    all_data_table(day_value);
});

filter.on("click", function(){

    let day_value = day.property("value");
    let dest_value = destination.property("value");
    let airline_value = airline.property("value");

    buildcharts(day_value, airline_value, dest_value);

});

add.on("click", function(){

    let day_value = day.property("value");
    let dest_value = destination.property("value");
    let airline_value = airline.property("value");

    addtraces(day_value, airline_value, dest_value);

});

function buildcharts (day, line, dest)
{

        daystring = `/day/${day}`
        console.log(daystring);
        d3.json(daystring).then((x) => {

            let airline = x.filter(y => y[5] === line);
            let air = airline.filter(z => z[1] === dest);
            let air_salidas = air.map(s => s[0]);
            let air_destino = air.map(s => s[1]);
            let air_origen = air.map(s => s[2]);
            let air_llegadas = air.map(s => s[3]);
            let air_precios = air.map(p => p[4]);
            let air_aerolinea = air.map(s => s[5]);

            let trace1 = 
            {
            x: air_salidas,
            y: air_precios,
            name: day,
            };

            let layout1 = 
            {
            xaxis: {title: "Hora"},
            yaxis: {title: "Precio (MXN / USD)"},
            height: 600,
            width: 1500
            };
    
            Plotly.newPlot("plot1", [trace1], layout1);

            console.log(airline);

            let data = [{
                type: 'table',
                header: {
                  values: [
                      ["<b>Aerolinea</b>"], 
                      ["<b>Hora Salida</b>"],
                      ["<b>Hora Llegada</b>"],
                      ["<b>Origen</b>"],
                      ["<b>Destino</b>"],
                      ["<b>Menor Precio</b>"]
                    ],
                  align: "center",
                  line: {width: 1, color: 'black'},
                  fill: {color: "grey"},
                  font: {family: "Arial", size: 12, color: "white"}
                },
                cells: {
                  values: [air_aerolinea,air_salidas,air_llegadas,air_origen,air_destino,air_precios],
                  align: "center",
                  line: {color: "black", width: 1},
                  font: {family: "Arial", size: 11, color: ["black"]}
                }
              }]
              
              Plotly.newPlot('plot2', data);
              //revisa como hacer subplots en plotly para meter todo en 'plot1'

        });

}

function addtraces (day, line, dest)
{
    daystring = `/day/${day}`
    console.log(daystring);
    d3.json(daystring).then((x) => {

        let airline = x.filter(y => y[5] === line);
        let air = airline.filter(z => z[1] === dest);
        let air_precios = air.map(p => p[4]);
        let air_salidas = air.map(s => s[0]);

        let trace1 = 
        {
        x: air_salidas,
        y: air_precios,
        name: day,
        };

        let layout1 = 
        {
        xaxis: {title: "Hora"},
        yaxis: {title: "Precio (MXN / USD)"},
        height: 600,
        width: 1500
        };

        Plotly.plot("plot1", [trace1], layout1);

    });
}

function all_data_table(day)
{
        daystring = `/day/${day}`
        d3.json(daystring).then((x) => {
            let tbody = d3.select("tbody");
            tbody.remove();
            d3.select("#prices-table").append("tbody");
            x.map((y) => {
                let tbody = d3.select("tbody");
                let row = tbody.append("tr");
                Object.entries(y).forEach(([key, value]) =>{
                  let cell = row.append("td");
                  cell.text(value);
                });
              });
        });
}
