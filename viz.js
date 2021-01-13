const wave1 = 'M2662.6 1S2532 41.2 2435 40.2c-19.6-.2-37.3-1.3-53.5-2.8 0 0-421.3-59.4-541-28.6-119.8 30.6-206.2 75.7-391 73.3-198.8-2-225.3-15-370.2-50-145-35-218 37-373.3 36-19.6 0-37.5-1-53.7-3 0 0-282.7-36-373.4-38C139 26 75 46-1 46v106c17-1.4 20-2.3 37.6-1.2 130.6 8.4 210 56.3 287 62.4 77 6 262-25 329.3-23.6 67 1.4 107 22.6 193 23.4 155 1.5 249-71 380-62.5 130 8.5 209 56.3 287 62.5 77 6 126-18 188-18 61.4 0 247-38 307.4-46 159.3-20 281.2 29 348.4 30 67 2 132.2 6 217.4 7 39.3 0 87-11 87-11V1z'
const wave2 = 'M2663.6 73.2S2577 92 2529 89c-130.7-8.5-209.5-56.3-286.7-62.4s-125.7 18-188.3 18c-5 0-10-.4-14.5-.7-52-5-149.2-43-220.7-39-31.7 2-64 14-96.4 30-160.4 80-230.2-5.6-340.4-18-110-12-146.6 20-274 36S820.4 0 605.8 0C450.8 0 356 71 225.2 62.2 128 56 60.7 28-.3 11.2V104c22 7.3 46 14.2 70.4 16.7 110 12.3 147-19.3 275-35.5s350 39.8 369 43c27 4.3 59 8 94 10 13 .5 26 1 39 1 156 2 250-70.3 381-62 130.5 8.2 209.5 56.3 286.7 62 77 6.4 125.8-18 188.3-17.5 5 0 10 .2 14.3.6 52 5 145 49.5 220.7 38.2 32-5 64-15 96.6-31 160.5-79.4 230.3 6 340 18.4 110 12 146.3-20 273.7-36l15.5-2V73l1-.5z'
const wave3 = 'M0 51.4c3.4.6 7.7 1.4 11 2.3 133.2 34 224.3 34 308.6 34 110.2 0 116.7 36.6 229.8 26 113-11 128.7-44 222-42.6C865 73 889 38 1002 27c113-10.8 119.6 25.6 229.8 25.6 84.4 0 175.4 0 308.6 34 133 34.2 277-73 379.4-84.3 204-22.5 283.6 128.7 283.6 128.7'
const wave4 = 'M0 6C115.7-6 198.3 76.6 308 76.6c109.6 0 131.8-20 223-28.3 114.3-10.2 238.2 0 238.2 0s124 10.2 238.3 0c91-8.2 113.2-28 223-28S1425 103 1541 91c115.8-11.8 153.3-69 269.3-84.6 116-15.5 198.4 71 308 71 109.8 0 131.8-20 223-28 114-10.2 237.7 0 237.7 0s37.4 2.4 82.8 3.7'

width = window.innerWidth

skills = [{
    name: 'D3',
    url: './img/d3.png',
    type: 'Front-End',
  },
  {
    name: 'SQL',
    url: './img/sql.png',
    type: 'Data-Management',
  },
  {
    name: 'Python',
    url: './img/python.png',
    type: 'Data-Management',
  },
  {
    name: 'CSS',
    url: './img/css.png',
    type: 'Front-End',
  },
  {
    name: 'Tableau',
    url: './img/tableau.png',
    type: 'Front-End',
  },
  {
    name: 'Tableau Server',
    url: './img/tableau-server.png',
    type: 'Data-Infrastructure',
  },
  {
    name: 'Terraform',
    url: './img/terraform.png',
    type: 'Data-Infrastructure',
  },
  {
    name: 'HPCC',
    url: './img/HPCC.png',
    type: 'Data-Management',
  },
  {
    name: 'Alteryx',
    url: './img/alteryx.png',
    type: 'Data-Management',
  },
  {
    name: 'AWS',
    url: './img/aws.png',
    type: 'Data-Infrastructure',
  },
]

links = [
  {
    source: 'D3',
    target: 'AWS',
    value: 1,
  },
  {
    source: 'D3',
    target: 'CSS',
    value: 1,
  },
  {
    source: 'D3',
    target: 'Python',
    value: 1,
  },
  {
    source: 'CSS',
    target: 'AWS',
    value: 1,
  },
  {
    source: 'Tableau',
    target: 'Tableau Server',
    value: 1,
  },
  {
    source: 'Tableau',
    target: 'Python',
    value: 1,
  },
  {
    source: 'Tableau',
    target: 'Alteryx',
    value: 1,
  },
  {
    source: 'Tableau',
    target: 'SQL',
    value: 1,
  },
  {
    source: 'Tableau Server',
    target: 'SQL',
    value: 1,
  },
  {
    source: 'Tableau Server',
    target: 'AWS',
    value: 1,
  },
  {
    source: 'Tableau Server',
    target: 'Terraform',
    value: 1,
  },
  {
    source: 'HPCC',
    target: 'Tableau Server',
    value: 1,
  },
  {
  source: 'HPCC',
  target: 'Terraform',
  value: 1,
  },
]

barColours = [{offset: 0, colour: '#00A8DE'}, {offset: 0.2, colour: '#333391'}, {offset: 0.4, colour: '#E91388'}, {offset: 0.8, colour: '#EB2D2E'}]
pointColour = d3.scaleOrdinal(d3.schemeCategory10)

bannerSvg = d3.select('#inner-wrap').append('svg')
  .attr('class', 'waves')
  .attr('xmlns', 'http://www.w3.org/2000/svg')
  .attr('width', width)
  .attr('height', 225)
  .attr('viewbox', `viewBox="0 0 ${width} 600`)
  .attr('preserveAspectRatio', 'xMidYMax meet')

defs = bannerSvg.append('defs')

waveGradient = defs.append('linearGradient')
  .attr('id', 'a')

// waveGradient
//   .append('stop')
//   .data(barColours)
//   .attr('offset', d => d.offset)
//   .attr('stop-color', d => d.colour)

waveGradient.append('stop')
  .attr('offset', 0)
  .attr('stop-color', '#00A8DE')

waveGradient.append('stop')
  .attr('offset', 0.2)
  .attr('stop-color', '#333391')

waveGradient.append('stop')
  .attr('offset', 0.4)
  .attr('stop-color', '#E91388')

waveGradient.append('stop')
  .attr('offset', 0.8)
  .attr('stop-color', '#EB2D2E')

bannerSvg.append('path')
  .attr('class', 'wave1')
  .attr('fill', 'url(#a)')
  .attr('d', wave1)

bannerSvg.append('path')
  .attr('fill', '#F2F5F5')
  .attr('d', wave2)

waveGroup = bannerSvg.append('g')
  .attr('fill', 'none')
  .attr('stroke', '#E2E9E9')
  .attr('stroke-width', 1)

waveGroup.append('path')
  .attr('d', wave3)

waveGroup.append('path')
  .attr('d', wave4)

bannerSvg.append('text')
  .attr('text-align', 'center')
  .attr('x', width / 2)
  .attr('y', 107)
  .text('Joseph Smith')

var main = d3.select('#main')
var scrolly = d3.select('#containter')
var figure = scrolly.select('#graph')
var article = scrolly.select('#sections')
var step = article.selectAll('.storySection')

var scroller = scrollama()

graph = d3.select('#graph')
  .append('svg')
  .attr('width', 450)
  .attr('height', 800)

const simulation = d3.forceSimulation(skills)
  .force('link', d3.forceLink(links).id(d => d.name))
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(225, 400))
  .force('collide', d3.forceCollide().radius(16))

const link = graph.append('g')
  .attr('stroke', '#999')
  .attr('stroke-opacity', 0.6)
  .selectAll('line')
  .data(links)
  .join('line')
  .attr('stroke-width', d => d.value)

const node = graph.append('g')
  .attr('stroke', '#fff')
  .attr('stroke-width', 1.5)
  .selectAll('circle')
  .data(skills)
  .join('circle')
  .attr('r', 7.5)
  .attr('fill', d => pointColour(d.type))

simulation.on('tick', tick)

scroller
  .setup({
    step: '.storySection',
    offset: 0.33,
    debug: true
  })
  .onStepEnter(handleStepEnter)

function handleStepEnter(response) {
  if (response.index === 0) {

  } else if (response.index === 1) {

  }
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