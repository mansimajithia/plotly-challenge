var  dropdownMenu = d3.select("#selDataset");

function init() {
  d3.json("../../samples.json").then(function (data) {
    console.log(data);
  });
};


  function barChart(name) {
    name = parseInt(name)
    var samples = data.samples.filter(s => +s.id === name)[0];
    // Get the top 10
    var sampleValues = samples.sample_values.slice(0, 10).reverse();
    var otuIds = samples.otu_ids.slice(0, 10).reverse();
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

    Plotly.newPlot("bar-plot", data, layout);

  };



  function bubbleChart(name) {
    name = parseInt(name)
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
        size: otuLabels
      }
    };
    var data = [trace2];
    var layout = {
      title: "Top 10 OTUs"
    };

    Plotly.newPlot("bubble", data, layout);

  };
 
init ();

