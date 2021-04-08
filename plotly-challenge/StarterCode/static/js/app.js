function make_meta(metadata){
    var return_value = "";
    for (var key in metadata[0]) {
        if (metadata[0].hasOwnProperty(key)) {
            return_value += "<strong>" + key + ": </strong>" + metadata[0][key] + "<br>";
        }
    }
    return return_value;
};

d3.json("samples.json").then(data => {
    console.log(data);

    let sample = data.samples.filter(sample => sample.id === "940");
    let metadata = data.metadata.filter(metadatum => metadatum.id === 940);

    console.log(metadata[0]);

    //Populate demographic info
    d3.select("#sample-metadata").html(make_meta(metadata));

    // Bar chart variables
    let xBar = (sample[0].sample_values).sort((a, b) => b - a).slice(0, 10).reverse();
    let yBar = JSON.stringify(sample[0].otu_ids.sort((a, b) => b - a).slice(0, 10).reverse());
    let hovertext = sample[0].otu_labels.sort((a, b) => b - a).slice(0, 10).reverse();

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

    console.log(xBar);
    console.log(yBar);

    // Bubble chart variables
    let xBubble = JSON.stringify(sample[0].otu_ids);
    let yBubble = (sample[0].sample_values).sort((a, b) => b - a).slice(0, 10);
    let markerSize = sample[0].sample_values;
    let markerColor = sample[0].otu_ids;
    let textValue = sample[0].otu_labels;

    // Build bubble chart:
    let bubbleData = [{
        x: xBubble,
        y: yBubble,
        marker: {
            color: markerColor.sort((a, b) => b - a).slice(0, 10),
            size: markerSize,
        mode: 'markers'
        }
    }];

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

updatePlots = (data, id) => {
    console.log(data)
    console.log(id)

    let sample = data.samples.filter(sample => sample.id === id);
    let metadata = data.metadata.filter(metadatum => metadatum.id === +id);

    console.log(sample);

    //Populate demographic info
    d3.select("#sample-metadata").html("");
    d3.select("#sample-metadata").html(make_meta(metadata));

    // Bar chart variables
    let xBar = (sample[0].sample_values).sort((a, b) => b - a).slice(0, 10).reverse();
    let yBar = JSON.stringify(sample[0].otu_ids.sort((a, b) => b - a).slice(0, 10).reverse());
    let hovertext = sample[0].otu_labels.sort((a, b) => b - a).slice(0, 10).reverse();

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

    // Bubble chart variables
    let xBubble = JSON.stringify(sample[0].otu_ids);
    let yBubble = (sample[0].sample_values).sort((a, b) => b - a).slice(0, 10);
    let markerSize = sample[0].sample_values;
    let markerColor = sample[0].otu_ids;
    let textValue = sample[0].otu_labels;

    // Build bubble chart:
    let bubbleData = [{
        x: xBubble,
        y: yBubble,
        marker: {
            color: markerColor.sort((a, b) => b - a).slice(0, 10),
            size: markerSize,
        mode: 'markers'
        }
    }];

    let bubbleLayout = {
        title: 'Top 10 OTUs',
    };

    // Plot bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
};

optionChanged = (id) => {
    d3.json("samples.json").then (data => {
        console.log(data);
        updatePlots(data, id);
    });
};