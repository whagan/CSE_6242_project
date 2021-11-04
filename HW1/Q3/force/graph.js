const width = 1000
//window.innerWidth;
const height = 1000
// window.innerHeight;


var svg = d3.select('svg')
    .attr('viewBox', [0 , 0, width, height]);

d3.json('../../Q1/data/graph.json').then(function(graph)   {
    var tooltip = d3
                .select("body")
                .append("div") // the tooltip always "exists" as its own html div, even when not visible
                .attr('class', 'svg-tooltip')
                .style("position", "absolute") // the absolute position is necessary so that we can manually define its position later
                .style("visibility", "hidden") // hide it from default at the start so it only appears on hover
                .text('test test')
    var node = svg.append('g')
            .selectAll('circle')
            .data(graph.nodes)
            .enter().append('circle')
            .attr('r', 5)
            .attr('fill', 'black');
    node.on('mouseover', function(d) {
        console.log(d)
        d3.select(this).transition()
            .duration('50')
            .attr('r', 8);
        return tooltip.style('visibility', 'visible')
            .style('top', (d.pageY-20)+"px")
            .style('left', (d.pageX+20)+"px");
        })
        .on('mouseout', function()  {
        d3.select(this).transition()
            .duration('50')
            .attr('r', 5);
        return tooltip.style('visibility', 'hidden');
    });
    var link = svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(graph.links)
            .enter().append('line')
            .attr('stroke-width', 1)
            .attr('stroke', 'black');

    var simulation = d3.forceSimulation()
                        .nodes(graph.nodes)
                        .force('charge', d3.forceManyBody())
                        .force('center', d3.forceCenter(width / 2, height / 2))
                        .force('link', d3.forceLink(graph.links))
                        .on('tick', tick);
    
    
    function tooltip_in(circle)   {
        console.log(circle)
        return tooltip
                .html("<p>hey</p>") // add an html element with a header tag containing the name of the node.  This line is where you would add additional information like: "<h4>" + d.name + "</h4></br><p>" + d.type + "</p>"  Note the quote marks, pluses and </br>--these are necessary for javascript to put all the data and strings within quotes together properly.  Any text needs to be all one line in .html() here
                .style("visibility", "visible") // make the tooltip visible on hover
                .style("top", circle.cy.baseVal.valueAsString + "px") // position the tooltip with its top at the same pixel location as the mouse on the screen
                .style("left", circle.cx.baseVal.valueAsString + "px"); // position the tooltip just to the right of the mouse location
    }
    function tick() {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    }
});
