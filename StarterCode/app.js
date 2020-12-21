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
        for (x=0; x<10; x++){
            var y_axis = filterdata[0].otu_ids[x]
            var labels = filterdata[0].otu_labels.slice[x]};
        var trace1 = {
            x: x_axis,
            y: y_axis,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        var data = [trace1];

        var layout = {
            title: "Top 10 OTUs Found",}

        Plotly.newPlot("bar", data, layout);
    })
};



function optionChanged(newsample){
    buildtable(newsample)
    buildchart(newsample)
}