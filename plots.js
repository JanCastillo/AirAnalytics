console.log(avianca);

var selector = d3.select("select")

selector.on("change", function() {

    var input_value = selector.property("value");
    console.log(input_value);
    var chosen_airport = avianca.filter(d => d.Destino === input_value);
    var salida = chosen_airport.map(h => h.Hora_Salida);
    var precio = chosen_airport.map(p => p.Desde);
    console.log(salida);
    var trace1 = {
        x: salida,
        y: precio,
        type: "scatter",
        mode: "lines",
    };
    
    var data = [trace1];
    
    var layout = {
        title: "AVIANCA",
        width: 1500,
        height: 600,
    };
    
    Plotly.newPlot("plot", data, layout);
    
});

