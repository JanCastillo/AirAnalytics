var destination = d3.select("#destination");
var day = d3.select("#day");
var filter = d3.select("#filter")

filter.on("click", function(){
    let day_value = day.property("value");
    let dest_value = destination.property("value");

    buildcharts(day_value, dest_value);

});

function buildcharts (day, destination)
{

        daystring = `/day/${day}`
        console.log(daystring);
        d3.json(daystring).then((x) => {

            let aeromexico = x.filter(y => y[5] === "AMX");
            let amx = aeromexico.filter(z => z[1] === destination)
            let amx_precios = amx.map(p => p[4]);
            let amx_salidas = amx.map(s => s[0]);
            let amx_destinos = amx.map(d => d[1]);
            console.log(`AEROMEXICO: ${amx_precios}`);

            let avianca = x.filter(y => y[5] === "AVI");
            let avi = avianca.filter(z => z[1] === destination)
            let avi_precios = avi.map(p => p[4]);
            let avi_salidas = avi.map(s => s[0]);
            let avi_destinos = avi.map(d => d[1]);
            console.log(`AVIANCA: ${avi_precios}`);

            let united = x.filter(y => y[5] === "UAL");
            let ual = united.filter(z => z[1] === destination)
            let ual_precios = ual.map(p => p[4]);
            let ual_salidas = ual.map(s => s[0]);
            let ual_destinos = ual.map(d => d[1]);
            console.log(`UNITED: ${ual_precios}`);

            let trace1 = 
            {
            x: amx_salidas,
            y: amx_precios,
            text: amx_destinos,
            };

            let trace2 = 
            {
            x: avi_salidas,
            y: avi_precios,
            text: avi_destinos,
            };

            let trace3 = 
            {
            x: ual_salidas,
            y: ual_precios,
            text: ual_destinos,
            };

            let layout1 = 
            {
            xaxis: {title: "Hora"},
            yaxis: {title: "Precio (MXN)"},
            height: 250,
            width: 1500
            };

            let layout2 = 
            {
            xaxis: {title: "Hora"},
            yaxis: {title: "Precio (USD)"},
            height: 250,
            width: 1500
            };
    
            Plotly.newPlot("plot1", [trace1], layout1);
            Plotly.newPlot("plot2", [trace2], layout1);
            Plotly.newPlot("plot3", [trace3], layout2);

        });

};