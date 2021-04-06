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
 updateInfo = (data, id) => {
    // let id = d3.event.target.value; // value of ddl
    let sample = data.samples.filter(sample => sample.id === id);
    let xBubble = sample.otu_ids;
    let yBubble = sample.sample_values;
    let xBar = sample.sample_values;
    let yBar = sample.otu_ids;

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
d3.json("samples.json").then(data => {
    console.log(data);
    let otu_ids = unpack(data.samples, 1);
    let sample_values = unpack(data.samples, 2);
    let otu_labels = unpack(data.samples, 3);
    ...
    let dropdownMenu = d3.select("#selDataset");
    let input = dropdownMenu.property("value");
});



// So: Start by finishing d3.json and drawing initial plots.
// Go on to updateInfo and make sure all variables necessary for plotting are established
// Then try to figure out restyle