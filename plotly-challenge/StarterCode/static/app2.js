let id = 940;

d3.json("samples.json").then(data => {
    console.log(data);

let input = d3.select("#selDataset");
data.names.forEach(element => {
    input.append("option").attr("value", element).text(element)

updatePlots = (data, id) => {
    console.log(data)
    console.log(id)

    let sample = data.samples.filter(sample => sample.id === id);

    console.log(sample);
    console.log(sample[0].sample_values);

    // Bar chart variables
    let xBar = (sample[0].sample_values).sort((a, b) => b - a).slice(0, 10);
    let yBar = JSON.stringify(sample[0].otu_ids);
    let hovertext = sample[0].otu_labels;

    let barData = [{
        x: xBar,
        y: yBar,
        type: 'bar',
        orientation: 'h',
        text: hovertext,
        width: .8
    }];

    let barLayout = {
        title: 'Top 10 OTUs',
    }

    Plotly.newPlot("bar", barData, barLayout);

    // // Bubble chart variables
    // let xBubble = JSON.stringify(sample[0].otu_ids);
    // let yBubble = (sample[0].sample_values).slice(0, 10);
    // let markerSize = sample[0].sample_values;
    // let markerColor = sample[0].otu_ids;
    // let textValue = sample[0].otu_labels;

    // // Re-build bubble chart
    // Plotly.restyle("bubble", bubbleData, bubbleLayout);
};

optionChanged = (id) => {
    d3.json("samples.json").then (data => {
        console.log(data);
        updatePlots(data, id);
    });
};
