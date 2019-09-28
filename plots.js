console.log(avianca);
console.log(aeromexico);

var destination = d3.select("#destination");
var airline = d3.select("#airline");

airline.on("change", function() {

    var airline_value = airline.property("value");

    if (airline_value === "AVIANCA"){
        let dest_value = destination.property("value");
        let chosen_airport = avianca.filter(d => d.Destino === dest_value);
        var salida = chosen_airport.map(h => h.Hora_Salida);
        var precio = chosen_airport.map(p => p.Desde);
    } else if (airline_value === "AEROMEXICO"){
        let dest_value = destination.property("value");
        let chosen_airport = aeromexico.filter(d => d.Destino === dest_value);
        console.log(chosen_airport);
        var salida = chosen_airport.map(h => h.Hora_Salida);
        var precio = chosen_airport.map(p => p.Desde);
    }

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