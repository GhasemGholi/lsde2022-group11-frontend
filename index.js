var height = 600;
var width = 960;

var zoom = d3.zoom()
  .scaleExtent([0.1, 8])
  .on("zoom", zoomed);

var svg = d3.select("#mainDiv").append("svg")
  .attr("width", width)
  .attr("height", height)
  .call(zoom)
  .append("g")
  .attr("id", "topG");

zoom.scaleTo(d3.select("svg"), 0.35);

window.onwheel = function () { return false; }

var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(function (d) { return d.id; }).distance(40))
  .force("charge", d3.forceManyBody())
  .force("collision", d3.forceCollide(12))
  .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("temp.json", function (error, graph) {
  if (error) throw error;

  var link = svg.append("g")
    .attr("class", "links")
    .call(d3.zoomTransform)
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .classed("link", true)
    .each(function (d) {
      var level = d.level;
      d3.select(this)
        .classed("level" + level, true);
    });

  var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("g").attr("class", "node")
    .each(function (d) {
      var level = d.level;
      d3.select(this)
        .classed("level" + level, true);
    })
    .on('mousedown', function () { d3.event.stopPropagation(); })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  var circle = node.append("circle")
    .attr("r", 12);

  node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function (d) { return d.name });

  simulation
    .nodes(graph.nodes)
    .on("tick", ticked)

  simulation.force("link")
    .links(graph.links);

  function ticked() {
    link
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });

    node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

    if (simulation.alpha() < 0.015) {
      simulation.stop();
      simulation.force("fixed", setFixed(node));
    }
  }

  function dragstarted(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
    d.fixed = false;
    d.classed("fixed", false);
  }

  function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    ticked();
  }

  function dragended(d) {
    d3.select(this).classed("dragging", false);
    d.fixed = true;
    d.classed("fixed", true);
  }
});

function setFixed(node) {
  node.classed('fixed', true);
  node.each(function (d) {
    d.fixed = true;
  });
}

function zoomed() {
  var topG = d3.select("#topG");
  topG.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")scale(" + d3.event.transform.k + ")");
}

var jsonArrCrossRef = {
  "list": [
    { "text": "Astronomy and Astrophysics and Space and Planetary Science", "val": "58" },
    { "text": "Space and Planetary Science and Astronomy and Astrophysics", "val": "58" },
    { "text": "Molecular Biology and Genetics", "val": "30" },
    { "text": "General Medicine and Pharmacology", "val": "33" },
    { "text": "General Medicine and Microbiology", "val": "33" },
    { "text": "Cardiology and Cardiovascular Medicine and Internal Medicine", "val": "60" },
    { "text": "Physical and Theoretical Chemistry and General Chemistry", "val": "56" },
    { "text": "Pharmacology and Cellular and Molecular Neuroscience", "val": "52" },
    { "text": "Organic Chemistry and Physical and Theoretical Chemistry", "val": "56" },
    { "text": "Cancer Research and Oncology", "val": "28" },
    { "text": "General Materials Science and General Chemistry", "val": "47" },
    { "text": "Psychiatry and Mental health and General Medicine", "val": "49" },
    { "text": "Cellular and Molecular Neuroscience and Psychiatry and Mental health", "val": "68" },
    { "text": "Immunology and Immunology and Allergy", "val": "37" },
    { "text": "General Chemistry and Polymers and Plastics", "val": "43" },
    { "text": "Genetics and Molecular Biology", "val": "30" },
    { "text": "Cellular and Molecular Neuroscience and Molecular Biology", "val": "57" },
    { "text": "Genetics and Genetics(clinical)", "val": "31" }
  ]
};

var jsonArrInRef = {
  "list": [{ "text": "Astronomy and Astrophysics and Space and Planetary Science", "val": "58" },
  { "text": "Space and Planetary Science and Astronomy and Astrophysics", "val": "58" },
  { "text": "Cancer Research and Oncology", "val": "28" },
  { "text": "Ecology, Evolution, Behavior and Systematics and Plant Science", "val": "62" },
  { "text": "Immunology and Immunology and Allergy", "val": "37" },
  { "text": "Drug Discovery and General Medicine", "val": "35" },
  { "text": "Molecular Biology and Biochemistry", "val": "34" },
  { "text": "General Materials Science and General Chemistry", "val": "47" },
  { "text": "Oceanography and Global and Planetary Change", "val": "44" },
  { "text": "Cell Biology and Molecular Biology", "val": "34" },
  { "text": "Oncology and Cancer Research", "val": "28" },
  { "text": "Molecular Biology and Genetics", "val": "30" },
  { "text": "Obstetrics and Gynaecology and Reproductive Medicine", "val": "52" },
  { "text": "Cancer Research and General Medicine", "val": "36" },
  { "text": "General Chemistry and Organic Chemistry", "val": "39" },
  { "text": "General Chemistry and Applied Mathematics", "val": "41" },
  { "text": "Pharmacology and Drug Discovery", "val": "31" },
  { "text": "General Chemistry and General Materials Science", "val": "47" }]
};

var barColors = ["red", "green", "blue", "orange", "brown", "yellow", "red", "green", "blue", "orange", "brown", "yellow", "red", "green", "blue", "orange", "brown", "yellow"];

var labelsCross = jsonArrCrossRef.list.map(function (e) {
  return e.text;
});

var valCross = jsonArrCrossRef.list.map(function (e) {
  return e.val;
});

var labelsIn = jsonArrInRef.list.map(function (e) {
  return e.text;
});

var valIn = jsonArrInRef.list.map(function (e) {
  return e.val;
});

new Chart("myChartCross", {
  type: "bar",
  data: {
    labels: labelsCross,
    datasets: [{
      backgroundColor: barColors,
      data: valCross,
      beginAtZero: true
    }]
  },
  options: {
    legend: { display: false },
    responsive: true,
    title: {
      display: true,
      text: "Scientific Communities Cross-reference"
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of cross references'
        },
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          display: false //this will remove only the label
        },
        scaleLabel: {
          display: true,
          labelString: 'Communities'
        }
      }]
    }
  }
});

new Chart("myChartIn", {
  type: "bar",
  data: {
    labels: labelsIn,
    datasets: [{
      backgroundColor: barColors,
      data: valIn,
      beginAtZero: true
    }]
  },
  options: {
    legend: { display: false },
    responsive: true,
    title: {
      display: true,
      text: "Scientific Communities Inner-reference"
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of inner references'
        },
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          display: false //this will remove only the label
        },
        scaleLabel: {
          display: true,
          labelString: 'Communities'
        }
      }]
    }
  }
});