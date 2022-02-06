// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    let sampleData = data;
    // Create a variable that filters the samples for the object with the desired sample number.
    filteredSamples = sampleData.function(data.filteredSamples = desiredSampleNumber);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    filterMetadata = sampleData.filter(data.metadata);
    // Create a variable that holds the first sample in the array.
    firstSample = sampledata[0];
    
    // 2. Create a variable that holds the first sample in the metadata array.
    let samples = 

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    let v = otu_ids;
    let v2 = otu_labels;
    let v3 = sample_values;

    // 3. Create a variable that holds the washing frequency.
   
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot();
  });
}
