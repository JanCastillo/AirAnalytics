console.log(data);

var origen = data.map(d => o.Destino);
console.log(destino);

var llegada = data.map(ll => ll.Hora Llegada);
console.log(llegada);

var precio = data.map(p => p.Desde);
console.log(precio);

var trace1 = {
    x: names,
    y: greek,
    type: "bar",
    name: "Greek"
};

var trace2 = {
    x: names,
    y: roman,
    type: "scatter",
    name: "Roman"
};

console.log(trace1);

var data = [trace1, trace2];

var layout = {
    title: "Green vs Roman",
    width: 1500,
    height: 600,
};

Plotly.newPlot("plot", data, layout);