function init() {
  d3.json("samples.json").then(function ([data]) {
    d3.select("#selDataset")
      .selectAll("option")
      .data(data.names)
      .enter()
      .append("option")
      .text(d => d);
    barChart("940", data);
    bubbleChart("940", data)
    console.log(data);
  });
};


function barChart(name, data) {
  name = parseInt(name)
  var samples = data.samples.filter(s => +s.id === name)[0];
  // Get the top 10
  var sampleValues = samples.sample_values.slice(0, 10).reverse();
  var otuIds = samples.otu_ids
    .slice(0, 10)
    .map(otu_id => "OTU " + otu_id)
    .reverse();
  var otuLabels = samples.otu_labels.slice(0, 10).reverse();
  // Plot
  var trace1 = {
    x: sampleValues,
    y: otuIds,
    text: otuLabels,
    type: "bar",
    orientation: "h",
  };
  var data = [trace1];

  var layout = {
    title: "Top 10 OTUs"
  }

  Plotly.newPlot("bar", data, layout);

};



function bubbleChart(name, data) {
  name = parseInt(name);
  console.log(name);
  var samples = data.samples.filter(s => +s.id === name)[0];
  // Get the top 10
  var sampleValues = samples.sample_values.slice(0, 10).reverse();
  var otuIds = samples.otu_ids.slice(0, 10).reverse();
  var otuLabels = samples.otu_labels.slice(0, 10).reverse();

  // Bubble Chart
  var trace2 = {
    x: otuIds,
    y: sampleValues,
    mode: 'markers',
    marker: {
      color: otuIds,
      size: sampleValues,
      colorscake: "Earth"
    }
  };
  var data = [trace2];
  var layout = {
    title: "Top 10 OTUs",
    height: 600,
    width: 1000
  };

  Plotly.newPlot("bubble", data, layout);

};

function optionChanged(id) {
  d3.json("samples.json").then(function ([data]) {
    barChart(id, data);
    bubbleChart(id, data);
  });
}

function metaData(name) {

  d3.json("samples.json").then(function (data) {
    name = parseInt(name)
    var metaDataResult = data.metaData
    var resultArray = data.metaData.filter(s => +s.id === name)[0];
    console.log(resultArray);
    var sampleMetaData = d3.select("#sample-metadata");

    sampleMetaData.html("");

    Object.entries(resultArray).forEach((key, value) => {
      sampleMetaData.append("h5").text(`${key[0]} ": " ${value} + "\n"`);
    });

  });
metaData(name);

};



init();



