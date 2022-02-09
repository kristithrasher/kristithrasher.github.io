// Create the buildChart function.
function buildCharts(sample) {
  i
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    let samples = data.samples;

    // Create a variable that filters the samples for the object with the desired sample number.
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    let metadata = data.metadata
    let metadataArray = metadata.filter(metaSample => metaSample.id == sample)

    // Create a variable that holds the first sample in the array.
    let result = resultArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    let metaResult = metadataArray[0];
    console.log(metadataSample)

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    let v = otu_ids;
    let v2 = otu_labels;
    let v3 = sample_values;

    // 3. Create a variable that holds the washing frequency.
    let wfreg = metadataSample.wfreq;
    // Create the yticks for the bar chart.
    var yticks = ids.slice(0, 10).map(otuId => `OTU  ${otuId}`).reverse();

    let barData = [
      {
        y: yticks, 
        x: values.slice(0,10).reverse(),
        text: labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }];
      let barLayout = {
        title: `Top 10 Bacteria Species Found ${sample}`
      };
      // 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout)
  

    // Use Plotly to plot the bubble data and layout.
    let bubbleData = [{
      x: ids,
      y: values,
      text: labels,
      mode: 'markers',
      marker: {
        color: ids,
        size: values,
        colorscale: 'Picnic'
      }

    }];
    

    // // 2. Create the layout for the bubble chart.
    let bubbleLayout = {
      title: `Bacteria Cultures Per Sample ${sample}`,
      yaxis: { title: "Bacteria Count" },
      xaxis: { title: "OTU ID" }
    };

    // 3. Use Plotly to plot the ata with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
    
  // 4. Create the trace for the gauge chart.just copied this code from plotly.com documentation 
    var gaugeData = [
      domain: { x: [0, 1], y: [0, 1] },
      value: 270,
      title: { text: "Speed" },
      type: "indicator",
      mode: "gauge+number"
	}];
];


  // 5. Create the layout for the gauge chart.
  var gaugeLayout = {
    title: "Belly Button Washing Frequency "
    width: 600, height: 500, margin: { t: 0, b: 0 }
  }; 

  // 6. Use Plotly to plot the gauge data and layout.
  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
});
}
