var destination = d3.select("#destination");
var day = d3.select("#day");
var airline = d3.select("#airline");

var filter = d3.select("#filter");
var add = d3.select("#add");

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
    
            Plotly.newPlot("plot1", [trace1], layout1);

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