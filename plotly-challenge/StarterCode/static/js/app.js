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
        let id = data.samples[0].id;
        let otu_ids = data.samples[0].otu_ids;
        let sample_values = data.samples[0].sample_values;
        let otu_labels = data.samples[0].otu_labels;
        let metadata = JSON.parse(data.metadata[0]);

        console.log(metadata);

        // Build demographics panel
        d3.select("#sample-metadata").html(metadata)

        
        // Build bar chart:
        let barData = [{
            x: sample_values,
            y: otu_ids.sort((a, b) => b - a).slice(0, 10),
            type: 'bar',
            orientation: 'h'
        }];

        let barLayout = {
            title: 'Top 10 OTUs',
        }

        // Plot bar chart
        Plotly.plot("bar", barData, barLayout)

        // Build bubble chart:
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            marker: {
                color: otu_ids,
                size: sample_values,
            mode: 'markers'
            }
        };

        let bubbleData = [trace1];

        let bubbleLayout = {
            title: 'Top 10 OTUs',
        };

        Plotly.plot("bubble", bubbleData, bubbleLayout)
        
        let dropdownMenu = d3.select("#selDataset");
        let input = dropdownMenu.property("data.samples.id");
    })
};

init();

// So: Start by finishing d3.json and drawing initial plots.
// Go on to updateInfo and make sure all variables necessary for plotting are established
// Build initial plots
// Then try to figure out restyle