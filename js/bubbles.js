////////////////////////////////// D3 //////////////////////////////////
function drawChart(data) {

  // Settings
  var width = 900;
  var height = 700;

  var svg = d3.select('#bubbles')
    .append('svg')
    .attr('class', 'bubls')
    .attr('width', width)
    .attr('height', height)
    .attr("viewBox", "0 0 900 700")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .append('g')
    .attr('transform', 'translate(0,0)');

  /////////// Building simulation
  //// Adding forces ;)

  // Settings
  var radiusCollide = 17;
  var button_collide = radiusCollide + 10;
  var strengthValue = 0.1;
  var alpha = 0.23;
  var alphaAll = 0.03;
  var alphaButtons = 0.3;
  var left = 250
  var right = 600
  var color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"])

  var forceX = d3.forceX(function() {
    return width / 2
  }).strength(strengthValue).x(width * .5)

  var forceY = d3.forceY(function() {
    return height / 2
  }).strength(strengthValue).y(height * .5)

  var colliding = d3.forceCollide(function() {
    return radiusCollide + 6
  })

  var collidingAfter = d3.forceCollide(function() {
    return radiusCollide
  })

  var collidingButtons = d3.forceCollide(function() {
    return button_collide
  })

  var inc = d3.forceX(function(d) {
    if ((d.inocuidad).length > 0) {
      return left
    } else {
      return right
    }
  })

  var ing = d3.forceX(function(d) {
    if ((d.ingredientes_criticos).length > 0) {
      return left
    } else {
      return right
    }
  })

  var fua = d3.forceX(function(d) {
    if ((d.funcionalidad_alimentaria).length > 0) {
      return left
    } else {
      return right
    }
  })

  // Putting all together
  var simulation = d3.forceSimulation()
    .force('x', forceX)
    .force('y', forceY)
    .force('collide', colliding);

  // Circles or Nodes - Potato, Potato...
  var circles = svg.selectAll('.gi')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'gi')
    .attr('r', radiusCollide)
    .attr("fill", function(d) {
      return color(d.codigo_entidad);
    })
    .attr('stroke', function(d) {
      return color(d.codigo_entidad);
    });


  ////////////// Buttons to group nodes
  d3.select('#all').on('click', function() {
    simulation
      .force('x', forceX)
      .alphaTarget(alphaAll)
      .restart()
  })

  d3.select('#inoc').on('click', function() {
    simulation
      .force('x', inc)
      .force('collide', collidingButtons)
      .alphaTarget(alphaButtons)
      .restart()
  })

  d3.select('#ingc').on('click', function() {
    simulation
      .force('x', ing)
      .force('collide', collidingButtons)
      .alphaTarget(alphaButtons)
      .restart()
  })

  d3.select('#funa').on('click', function() {
    simulation
      .force('x', fua)
      .force('collide', collidingButtons)
      .alphaTarget(alphaButtons)
      .restart();
  })

  // Starting simulation
  simulation.nodes(data)
    .on('tick', ticked);

  function ticked() {
    circles
      .attr('cx', function(d) {
        return d.x
      })
      .attr('cy', function(d) {
        return d.y
      });
  }

};
////////////////////////////////// D3 - END //////////////////////////////////
////////////////////////////////// Tabletop //////////////////////////////////
var pias = '1k1evTzwDEkuKoZQs9GT4Ny4ywPKXlXJzQuB8kZcfhBs';
var u = '14CoOreiOQwZxBk8L-j-THHp9qxRC4MkSizW9wboxYOo'

var options = {
  key: u,
  simpleSheet: true,
  callback: draw
}

function renderSpreadsheetData() {
  Tabletop.init(options)
}

function draw(data, tabletop) {
  drawChart(data);
}

renderSpreadsheetData();
////////////////////////////////// Tabletop - END//////////////////////////////////
