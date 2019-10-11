var destination = d3.select("#destination");
var day = d3.select("#day");
var table_day = d3.select("#table-day");
var airline = d3.select("#airline");

var filter = d3.select("#filter");
var add = d3.select("#add");
var table_data = d3.select("#table_data");
var table_data_filter = d3.select("#table_filter")

var latest = `/latest`

d3.json(latest).then((x) => {
    let AMX = x.filter(y => y[3] === "AMX")
    let AMX_salidas = AMX.map(s => s[0])
    let AMX_destinos = AMX.map(d => d[1])
    let AMX_precios = AMX.map(p => p[2])

    let AVI = x.filter(y =>y[3] === "AVI")
    let AVI_salidas = AVI.map(s => s[0])
    let AVI_destinos = AVI.map(d => d[1])
    let AVI_precios = AVI.map(p => p[2])

    let UAL = x.filter(y =>y[3] === "UAL")
    let UAL_salidas = UAL.map(s => s[0])
    let UAL_destinos = UAL.map(d => d[1])
    let UAL_precios = UAL.map(p => p[2])

    let AMX_table = [{
        type: 'table',
        header: {
            values: [
                ["<b>Destino</b>"],
                ["<b>Desde</b>"],
                ["<b>Salida</b>"]
            ],
            align: "center",
            line: { width: 1, color: 'black' },
            fill: { color: "grey" },
            font: { family: "Arial", size: 12, color: "white" }
        },
        cells: {
            values: [AMX_destinos, AMX_precios, AMX_salidas],
            align: "center",
            line: { color: "black", width: 1 },
            font: { family: "Arial", size: 11, color: ["black"] }
        }
    }]

    let AVI_table = [{
        type: 'table',
        header: {
            values: [
                ["<b>Destino</b>"],
                ["<b>Desde</b>"],
                ["<b>Salida</b>"]
            ],
            align: "center",
            line: { width: 1, color: 'black' },
            fill: { color: "grey" },
            font: { family: "Arial", size: 12, color: "white" }
        },
        cells: {
            values: [AVI_destinos, AVI_precios, AVI_salidas],
            align: "center",
            line: { color: "black", width: 1 },
            font: { family: "Arial", size: 11, color: ["black"] }
        }
    }]

    let UAL_table = [{
        type: 'table',
        header: {
            values: [
                ["<b>Destino</b>"],
                ["<b>Desde</b>"],
                ["<b>Salida</b>"]
            ],
            align: "center",
            line: { width: 1, color: 'black' },
            fill: { color: "grey" },
            font: { family: "Arial", size: 12, color: "white" }
        },
        cells: {
            values: [UAL_destinos, UAL_precios, UAL_salidas],
            align: "center",
            line: { color: "black", width: 1 },
            font: { family: "Arial", size: 11, color: ["black"] }
        }
    }]

    let table_layout = {
        margin: {
            t: 20, //top margin
            l: 20, //left margin
            r: 20, //right margin
            b: 20 //bottom margin
            }
    }; 

    Plotly.newPlot('AMX-latest', AMX_table, table_layout);
    Plotly.newPlot('AVI-latest', AVI_table, table_layout);
    Plotly.newPlot('UAL-latest', UAL_table, table_layout);

}); //sacar esta seccion a otro js.file para que solo se llame en index.html

table_data.on("click", function() {
    let day_value = table_day.property("value");
    all_data_table(day_value);
});

table_data_filter.on("click", function(){
    let day = table_day.property("value");
    let destino = d3.select("#table-destination").property("value");
    filtered_table(day, destino);
});

filter.on("click", function() {

    let day_value = day.property("value");
    let dest_value = destination.property("value");
    let airline_value = airline.property("value");

    buildcharts(day_value, airline_value, dest_value);

});

add.on("click", function() {

    let day_value = day.property("value");
    let dest_value = destination.property("value");
    let airline_value = airline.property("value");

    addtraces(day_value, airline_value, dest_value);

});

function buildcharts(day, line, dest) {

    daystring = `/day/${day}`

    d3.json(daystring).then((x) => {

        let airline = x.filter(y => y[5] === line);
        let air = airline.filter(z => z[1] === dest);
        let air_salidas = air.map(s => s[0]);
        let air_precios = air.map(p => p[4]);

        let trace1 = {
            x: air_salidas,
            y: air_precios,
            name: day,
        };

        let layout1 = {
            autosize: true,
            xaxis: { title: "Hora" },
            yaxis: { title: "Precio (MXN)" },

        };

        Plotly.newPlot("plot1", [trace1], layout1);

    });

    compstring = `/comparison/${dest}/${line}`
    d3.json(compstring).then((x) => {

        console.log(x);

        let tables = x.map(t => t.Table);
        let days = x.map(d => d.Day);
        let saldesd = x.map(s => s.Saldesd);

        let table_layout = {
            margin: {
                t: 20, //top margin
                l: 20, //left margin
                r: 20, //right margin
                b: 20 //bottom margin
                }
        }; 

        let data1 = [{
            type: 'table',
            header: {
                values: [
                    [`${tables[0]}<br>${days[0]}`],
                    [`${tables[1]}<br>${days[1]}`],
                    [`${tables[2]}<br>${days[2]}`],
                    [`${tables[3]}<br>${days[3]}`],
                    [`${tables[4]}<br>${days[4]}`],
                    [`${tables[5]}<br>${days[5]}`]
                ],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "grey" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: [
                    saldesd[0], 
                    saldesd[1], 
                    saldesd[2],
                    saldesd[3],
                    saldesd[4],
                    saldesd[5]
                ],
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('plot2', data1, table_layout);

        let data2 = [{
            type: 'table',
            header: {
                values: [
                    [`${tables[6]}<br>${days[6]}`],
                    [`${tables[7]}<br>${days[7]}`],
                    [`${tables[8]}<br>${days[8]}`]
                ],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "grey" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: [
                    saldesd[6],
                    saldesd[7],
                    saldesd[8],
                ],
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('plot3', data2, table_layout);

        d3.json(daystring).then((x) => {
            let airline = x.filter(y => y[5] === line);
            let air = airline.filter(z => z[1] === dest);
            let air_salidas = air.map(s => s[0]);

            let data3 = [{
                type: 'table',
                header: {
                    values: [
                        ["<b>Hora<br>Salida</b>"]
                    ],
                    align: "center",
                    line: { width: 1, color: 'black' },
                    fill: { color: "grey" },
                    font: { family: "Arial", size: 12, color: "white" }
                },
                cells: {
                    values: [air_salidas],
                    align: "center",
                    line: { color: "black", width: 1 },
                    font: { family: "Arial", size: 11, color: ["black"] }
                }
            }]

            Plotly.newPlot('plot4', data3, table_layout);
            Plotly.newPlot('plot5', data3, table_layout);

        })

    });
}

function addtraces(day, line, dest) {
    daystring = `/day/${day}`
    d3.json(daystring).then((x) => {

        let airline = x.filter(y => y[5] === line);
        let air = airline.filter(z => z[1] === dest);
        let air_precios = air.map(p => p[4]);
        let air_salidas = air.map(s => s[0]);

        let trace1 = {
            x: air_salidas,
            y: air_precios,
            name: day,
        };

        let layout1 = {
            autosize: true,
            xaxis: { title: "Hora" },
            yaxis: { title: "Precio (MXN / USD)" },

        };

        Plotly.plot("plot1", [trace1], layout1);

    });
}

function all_data_table(day) {
    daystring = `/day/${day}`
    d3.json(daystring).then((x) => {
        let tbody = d3.select("tbody");
        tbody.remove();
        d3.select("#prices-table").append("tbody");
        x.map((y) => {
            let tbody = d3.select("tbody");
            let row = tbody.append("tr");
            Object.entries(y).forEach(([key, value]) => {
                let cell = row.append("td");
                cell.text(value);
            });
        });
    });
}

function filtered_table(day, dest) {
    let string = `/day/${day}`
    d3.json(string).then((x) => {
        let tbody = d3.select("tbody");
        tbody.remove();
        d3.select("#prices-table").append("tbody");
        let DestFilter = x.filter(d => d[1] === dest)
        DestFilter.map((y) =>{
            let tbody = d3.select("tbody");
            let row = tbody.append("tr");
            Object.entries(y).forEach(([key, value]) => {
                let cell = row.append("td");
                cell.text(value);
            });
        });      
    });
}