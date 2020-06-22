function init(){
  d3.json("../../samples.json").then(function(data){
    console.log(data);
  });
};

function barChart(name) {
  var samples = data.samples.filter(s => +s.id ===name)[0];
  var sampleValues = samples.sample_values.slice(0,10).reverse();
  var outIds = samples.otu_ids.slice(0,10).reverse();
  var otuLabels = samples.otu_labels.slice(0,10).reverse();
}