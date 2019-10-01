var destination = d3.select("#destination");
var day = d3.select("#day");
var filter = d3.select("#filter")

filter.on("click", function(){
    let day_value = day.property("value");
    let chosen_day = data[day_value];
    let aeromexico = chosen_day.map(x => x.aeromexico);
    let avianca = chosen_day.map(y => y.avianca);
    let united = chosen_day.map(z => z.united);

    buildcharts(aeromexico,avianca,united);

});

function buildcharts (aeromexico,avianca,united) 

{

  var dest_value = destination.property("value");

  let amx = aeromexico[0].filter(x => x.Destino === dest_value);
  let amx_precios = amx.map(p => p.Desde);
  console.log(`AEROMEXICO: ${amx_precios}`);
  let amx_salidas = amx.map(s => s.Hora_Salida);
  let amx_destinos = amx.map(d => d.Destino);

  let avi = avianca[0].filter(x => x.Destino === dest_value);
  let avi_precios = avi.map(p => p.Desde);
  console.log(`AVIANCA: ${avi_precios}`);
  let avi_salidas = avi.map(s => s.Hora_Salida);
  let avi_destinos = avi.map(d => d.Destino);

  let ual = united[0].filter(x => x.Destino === dest_value);
  let ual_precios = ual.map(p => p.Desde);
  console.log(`UNITED: ${ual_precios}`);
  let ual_salidas = ual.map(s => s.Hora_Salida);
  let ual_destinos = ual.map(d => d.Destino);

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

};