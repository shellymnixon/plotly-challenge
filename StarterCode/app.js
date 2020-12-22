function DropDown(){
    d3.json("samples.json").then((sampledata)=>{
        console.log(sampledata)
        var samplenames = sampledata.names
        var location = d3.select("#selDataset")
        samplenames.forEach((Element) => {
            location.append("option").text(Element).property("value", Element)            
        });
        buildtable(samplenames[0])
        buildchart(samplenames[0])
    })
}
DropDown()
function buildtable(sampleID){
    d3.json("samples.json").then((sampledata)=>{
        var metadata = sampledata.metadata
        var locate = d3.select("#sample-metadata") 
        locate.html("")
        var filterdata = metadata.filter(x => x.id == sampleID)
        console.log(filterdata)
        Object.entries(filterdata[0]).forEach((Element) => {
            locate.append("option").text(Element).property("value", Element)
        });
    })
}
function buildchart(sampleID){
    d3.json("samples.json").then((sampledata)=>{
        var samples = sampledata.samples
        var filterdata = samples.filter(x => x.id == sampleID)
        var x_axis = filterdata[0].sample_values.slice(0,10)
        var y_axis = filterdata[0].otu_ids[0]
        var labels = filterdata[0].otu_labels[0]
        var trace1 = {
            x: x_axis,
            y: y_axis,
            text: labels,
            type: "bar",
            orientation: "h"};
        var data = [trace1];
        var layout = {
            title: "Top 10 OTUs Found",
        };
        Plotly.newPlot("bar", data, layout);
        var x_data = filterdata[0].otu_ids
        var y_data = filterdata[0].sample_values
        var o_labels = filterdata[0].otu_labels
        var trace2 = {
            x: x_data,
            y: y_data,
            text: o_labels,
            mode: "markers",
            marker:{
                size: filterdata[0].sample_values,
                color: filterdata[0].otu_ids}
        };
        var layout1 = {
            title: "Sample Display",
            xaxis: {
                title: filterdata[0].id}   
        }
        var data1 = [trace2];   
        Plotly.newPlot("bubble", data1, layout1);
    })
};
function optionChanged(newsample){
    buildtable(newsample)
    buildchart(newsample)
}