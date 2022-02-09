function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    let sampleNames = data.names;
    console.log(data)
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {

  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use .html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // 3. Create a variable that holds the samples array. 
    let samples = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    // Deliverable 3 step 1 
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    let metadata = data.metadata;
    console.log(metadata)

    let metadataArray = metadata.filter(metaObj => metaObj.id == sample);
    console.log(metadataArray);

    //  5. Create a variable that holds the first sample in the array.
    let result = resultArray[0];
    console.log(result);

    //Deliverable3 step2
    // 2. Create a variable that holds the first sample in the metadata array.
    let metaResult = metadataArray[0];
    console.log(metaResult);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let ids = result.otu_ids;
    console.log(ids);

    let labels = result.otu_labels
    console.log(labels);

    let values = result.sample_values
    console.log(values);

    // Deliverable3 step 3
    // 3. Create a variable that holds the washing frequency. convert to floating point number
    let wash = parseFloat(metaResult.wfreq);
    console.log(wash);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    // the back tik allows you to concatnate the string and the ids 
    var yticks = ids.slice(0, 10).map(otuId => `OTU  ${otuId}`).reverse();
    console.log(yticks);


    // 8. Create the trace for the bar chart. have to grab the top ten in desending order for valuels and labels too match there IDS.
    let barData = [
      {
        y: yticks,
        x: values.slice(0, 10).reverse(),
        text: labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }];

    // 9. Create the layout for the bar chart. 
    // Also added the sample id number that was selected from drop down menu
    let barLayout = {
      title: `Top 10 Bacteria Species Found ${sample}`
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)

    //DELIVERABLE 2 BUBBLE CHART
    // 1. Create the trace for the bubble chart. follow instructions from challenge instructions
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
    }
    ];


    // // 2. Create the layout for the bubble chart.
    let bubbleLayout = {
      title: `Bacteria Cultures Per Sample ${sample}`,
      yaxis: { title: "Bacteria Count" },
      xaxis: { title: "OTU ID" }
    };

    // 3. Use Plotly to plot the ata with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    //Deliverable 3 Step 4
    // 4. Create the trace for the gauge chart. used example from instructor  
    var gaugeData = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: wash,
        title: { text: "Belly Button Wash Frequency <br> Scrubs per Week", font: { size: 24 } },
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
          bar: { color: "black" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "Lime" },
            { range: [8, 10], color: "green" },
          ],

        }
      }

    ];
    // 5. Create the layout for the gauge chart. //used example from plotly documentation and instructor guidance
    var gaugeLayout = {
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "white",
      font: { color: "black", family: "Times New Roman" }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout)
  })
}