/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - id
 * index 1 - otu_ids
 * index 2 - sample_values
 * index 3 - otu_labels
 */



// filter data from json to narrow down to id
// this is the data to plot-- one specific otu_id, one specific sample_value
 updatePlots = (data, id) => {
    // let id = d3.event.target.value; // value of ddl
    let sample = data.samples.filter(sample => sample.id === id);

    // Bubble chart variables
    let xBubble = sample.otu_ids;
    let yBubble = sample.sample_values;
    let markerSize = sample.sample_values;
    let markerColor = sample.otu_ids;
    let textValue = sample.otu_labels;

    // Bar chart variables
    let xBar = sample.sample_values;
    let yBar = sample.otu_ids;
    let hovertext = sample.otu_labels;

};

// handleChange = (data) => {
//     let id = d3.event.target.value; // value of ddl
//     updateInfo(data, id)
// };

// optionChanged = (id) => {
//     // now, you have the id in hand
//     // but not the data, so you'd need to call d3.json
// }


// Establish variables and get data from json
// these are the variables that name all similar data within the json-- all otu_ids, all sample_values
function init() {
    d3.json("samples.json").then(data => {
        console.log(data);

        // Get data
        let id = unpack(data.samples, 0);
        let otu_ids = unpack(data.samples, 1);
        let sample_values = unpack(data.samples, 2);
        let otu_labels = unpack(data.samples, 3);
        let metadata = unpack(data.metadata);

        // Build bar chart:
        let barData = [{
            x: sample_values,
            y: otu_ids,
            type: 'bar'
        }];

        let barLayout = {
            title: 'Top 10 OTUs',
        }

        // Plot bar chart
        Plotly.newPlot("bar", barData, barLayout)

        // Build bubble chart:
        let bubbleData = [{
            x: otu_ids,
            y: sample_values,
            marker: {
                color: otu_ids,
                size: sample_values,
            mode: 'markers'
            };
        }];

        let bubbleLayout = {
            title: 'Top 10 OTUs',
        }

        Plotly.newPlot("bubble", bubbleData, bubbleLayout)
        
        ...
        let dropdownMenu = d3.select("#selDataset");
        let input = dropdownMenu.property("value");
    })
};


var data = [{
    x: [1999, 2000, 2001, 2002],
    y: [10, 15, 13, 17],
    type: 'scatter'
  }];
  
  var layout = {
    title: 'Sales Growth',
    xaxis: {
      title: 'Year',
      showgrid: false,
      zeroline: false
    },
    yaxis: {
      title: 'Percent',
      showline: false
    }
  
// So: Start by finishing d3.json and drawing initial plots.
// Go on to updateInfo and make sure all variables necessary for plotting are established
// Build initial plots
// Then try to figure out restyle