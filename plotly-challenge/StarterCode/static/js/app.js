d3.json("samples.json").then(data => {
    console.log(data);

    let sample = data.samples.filter(sample => sample.id === "940");
    let metadata = data.metadata[0];
    console.log([metadata]);

    //Populate demographic info
    d3.select("#sample-metadata").html([metadata]);

    // Bar chart variables
    let xBar = (sample[0].sample_values).sort((a, b) => b - a).slice(0, 10);
    let yBar = JSON.stringify(sample[0].otu_ids);
    let hovertext = sample[0].otu_labels;

    // Build bar chart:
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

    // Plot bar chart
    Plotly.newPlot("bar", barData, barLayout);

    // Bubble chart variables
    let xBubble = JSON.stringify(sample[0].otu_ids);
    let yBubble = (sample[0].sample_values).slice(0, 10);
    let markerSize = sample[0].sample_values;
    let markerColor = sample[0].otu_ids;
    let textValue = sample[0].otu_labels;

    // Build bubble chart:
    let bubbleData = {
        x: xBubble,
        y: yBubble,
        marker: {
            color: markerColor.sort((a, b) => b - a).slice(0, 10),
            size: markerSize,
        mode: 'markers'
        }
    };

    let bubbleLayout = {
        title: 'Top 10 OTUs',
    };

    // Plot bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Getting id from dropdown
    let input = d3.select("#selDataset");
    data.names.forEach(element => {
        input.append("option").attr("value", element).text(element)
    });
});

// // On change to the DOM, call handleChange()
// input.on("change", () => handleChange(data));

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


// handleChange = (data) => {
//     let id = d3.event.target.value; // value of ddl
//     updatePlots(data, id)
// };

optionChanged = (id) => {
    d3.json("samples.json").then (data => {
        console.log(data);
        updatePlots(data, id);
    });
};