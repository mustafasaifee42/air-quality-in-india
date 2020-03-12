import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
const AksaiChin = require('./MapData/map-Aksai Chin.json')
const Andaman = require('./MapData/map-Andaman and Nicobar.json')
const Andhra = require('./MapData/map-Andhra Pradesh.json')
const Arunachal = require('./MapData/map-Arunachal Pradesh.json')
const Assam = require('./MapData/map-Assam.json')
const Bihar = require('./MapData/map-Bihar.json')
const Chandigarh = require('./MapData/map-Chandigarh.json')
const Chhattisgarh = require('./MapData/map-Chhattisgarh.json')
const Dadra = require('./MapData/map-Dadra and Nagar Haveli.json')
const Daman = require('./MapData/map-Daman and Diu.json')
const Goa = require('./MapData/map-Goa.json')
const Gujarat = require('./MapData/map-Gujarat.json')
const Haryana = require('./MapData/map-Haryana.json')
const Himachal = require('./MapData/map-Himachal Pradesh.json')
const Jammu = require('./MapData/map-Jammu and Kashmir.json')
const JammuPart2 = require('./MapData/map-Jammu and Kashmir Part2.json')
const Jharkhand = require('./MapData/map-Jharkhand.json')
const Karnataka = require('./MapData/map-Karnataka.json')
const Kerala = require('./MapData/map-Kerala.json')
const Lakshadweep = require('./MapData/map-Lakshadweep.json')
const MP = require('./MapData/map-Madhya Pradesh.json')
const Maharashtra = require('./MapData/map-Maharashtra.json')
const Manipur = require('./MapData/map-Manipur.json')
const Meghalaya = require('./MapData/map-Meghalaya.json')
const Mizoram = require('./MapData/map-Mizoram.json')
const Nagaland = require('./MapData/map-Nagaland.json')
const Delhi = require('./MapData/map-NCT of Delhi.json')
const Odisha = require('./MapData/map-Odisha.json')
const Puducherry = require('./MapData/map-Puducherry.json')
const Punjab = require('./MapData/map-Punjab.json')
const Rajasthan = require('./MapData/map-Rajasthan.json')
const Sikkim = require('./MapData/map-Sikkim.json')
const Tamil = require('./MapData/map-Tamil Nadu.json')
const Telangana = require('./MapData/map-Telangana.json')
const Tripura = require('./MapData/map-Tripura.json')
const UP = require('./MapData/map-Uttar Pradesh.json')
const Uttarakhand = require('./MapData/map-Uttarakhand.json')
const WB = require('./MapData/map-West Bengal.json')
const data:{"state":string,"population": number,"weighted_pollution_2016": number,"llpp_who_2016": number,"llpp_2016":number,"city": string,"Total Years Lost": number}[] = require('./data/AQLIData.json')


class ProjectCards extends Component <{width:number,height:number,scale:number,translate:[number,number],maxRadius:number},{}> {
  node!: SVGSVGElement | null;

  componentDidMount(){

    let projection = d3.geoMercator()
      .scale(this.props.scale)
      .translate(this.props.translate);

    let path = d3.geoPath()
        .projection(projection)
    let colorScale = d3.scaleThreshold()
      .domain([0.1,1,2,3,4,5,6,7])
      .range(['#f1f1f1','#ffe6b3', '#ffc282', '#ff9f51', '#ff7b20', '#ef5d09', '#ce440b', '#ad2c0c', '#8c130e'])
    let radiusScale = d3.scaleLinear()
      .domain([d3.min(data, (d:{population:number}) => d.population),d3.max(data, (d:{population:number}) => d.population)])
      .range([2,this.props.maxRadius])
    let svg = d3.select(this.node);

    let g = svg.append("g");
    
    
    let stateName:string[] = ['Andaman and Nicobar','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Dadra and Nagar Haveli','Daman and Diu','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jammu and Kashmir Part2', 'Aksai Chin','Jharkhand','Karnataka','Kerala','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','NCT of Delhi','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal']
    let stateData = [Andaman,Andhra,Arunachal,Assam,Bihar,Chandigarh,Chhattisgarh,Dadra,Daman,Goa,Gujarat,Haryana,Himachal,Jammu,JammuPart2,AksaiChin,Jharkhand,Karnataka,Kerala,Lakshadweep,MP,Maharashtra,Manipur,Meghalaya,Mizoram,Nagaland,Delhi,Odisha,Puducherry,Punjab,Rajasthan,Sikkim,Tamil,Telangana,Tripura,UP,Uttarakhand,WB]
      
    let cities = data.map((d) => `${d.city}, ${d.state}`)
    let centroidData:any = []
    stateData.forEach((d,i) => {
      topojson.feature(d,d.objects[`map-${stateName[i]}`]).features.forEach((el:any) => {
        let obj = {'state': el.properties.NAME_1_NEW, 'city':el.properties.NAME_2_NEW, 'centroid':path.centroid(el), 'radius':radiusScale(data[cities.indexOf(`${el.properties.NAME_2_NEW}, ${el.properties.NAME_1_NEW}`)]['population'])}
        centroidData.push(obj)
      })
    })
    let keyG = svg.append('g')
      .attr('transform',`translate(${this.props.width / 2 + radiusScale(20000000) + 25},${this.props.height - 25})`)
    keyG.selectAll('.keyCircle')
      .data([1000000,10000000,20000000])
      .enter()
      .append('circle')
      .attr('cx',0)
      .attr('cy', (d:number, i:number) => 0 - radiusScale(d))
      .attr('r',(d:number, i:number) => radiusScale(d))
      .attr('stroke','#aaa')
      .attr('stroke-width','1')
      .attr('stroke-dasharray',"2 4")
      .attr('fill','none')
    keyG.selectAll('.keyCircleText')
      .data([1000000,10000000,20000000])
      .enter()
      .append('text')
      .attr('x',0)
      .attr('y', (d:number, i:number) => 0  - 2 * radiusScale(d) - 5)
      .attr('font-size',10)
      .attr('font-family','IBM Plex Sans')
      .attr('fill','#aaa')
      .attr('text-anchor', 'middle')
      .text((d:number) => `${d/1000000}M`)
    
    keyG.append('text')
      .attr('x',0 - radiusScale(20000000))
      .attr('y', 20)
      .attr('font-size',14)
      .attr('font-family','IBM Plex Sans')
      .attr('fill','#aaa')
      .text('Size of circle represents population')
    g.append('text')
      .attr('x',this.props.width / 2 + 15)
      .attr('y',this.props.height * 0.22)
      .text('North India is worst affected by air pollution')
      .attr('font-size',14)
      .attr('font-family','IBM Plex Sans')
      .attr('font-weight','bold')
      .attr('fill','#414141')
    g.append('text')
      .attr('x',this.props.width / 2 + 15)
      .attr('y',this.props.height * 0.22)
      .attr('dy',20)
      .text('288 million people, all in northern India would live')
      .attr('font-size',12)
      .attr('font-family','IBM Plex Sans')
      .attr('fill','#414141')
    g.append('text')
      .attr('x',this.props.width / 2 + 15)
      .attr('y', this.props.height * 0.22)
      .attr('dy',35)
      .text('at least 7 years longer on average')
      .attr('font-size',12)
      .attr('font-family','IBM Plex Sans')
      .attr('fill','#414141')
    g.selectAll('.keySquare')
      .data(['#f1f1f1','#ffe6b3', '#ffc282', '#ff9f51', '#ff7b20', '#ef5d09', '#ce440b', '#ad2c0c', '#8c130e'])
      .enter()
      .append('rect')
      .attr('x',this.props.width - 65)
      .attr('y',(d:string, i:number) => {
        return this.props.height -  (i  + 1) * 25
      })
      .attr('width', 10)
      .attr('height', 25)
      .attr('fill',(d:string, i:number) => d)
    g.append('text')
      .attr('x',this.props.width - 65)
      .attr('y', this.props.height -  250)
      .attr('font-size',12)
      .attr('font-family','IBM Plex Sans')
      .text('Gain in life')
    g.append('text')
      .attr('x',this.props.width - 65)
      .attr('y', this.props.height -  235)
      .attr('font-size',12)
      .attr('font-family','IBM Plex Sans')
      .text('expectancy')
    g.selectAll('.keySquareText')
      .data(['< 0.1','0.1-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '> 7'])
      .enter()
      .append('text')
      .attr('x',this.props.width - 50)
      .attr('y',(d:string, i:number) => {
        return this.props.height -  (i  + 1) * 25
      })
      .attr('dy', 15)
      .attr('font-size',12)
      .attr('font-family','IBM Plex Sans')
      .text((d:string) => `${d} yrs`)

    g.selectAll(`.cityCircle`)
      .data(centroidData)
      .enter()
      .append('circle')
      .attr('class',`cityCircle`)
      .attr("cx", (d:any) => d.centroid[0])
      .attr("cy", (d:any) => d.centroid[1])
      .attr("r",(d:any) => d.radius)
      .attr('fill',(d:any) => {
        if(cities.indexOf(`${d.city}, ${d.state}`) >= 0)
          return colorScale(data[cities.indexOf(`${d.city}, ${d.state}`)]['llpp_who_2016'])
        return '#000'
      })
      .on('mouseenter', (d:any) => {
        d3.select('.tooltip')
          .style('position','absolute')
          .style('display','inline')
          .style('left',`${d3.event.pageX + 20}px`)
          .style('top',`${d3.event.pageY - 30}px`)
        d3.select('.tooltipTitle').html(`${d.city}, ${d.state}`)
        d3.select('.tooltipPopulation').html(`Population: ${data[cities.indexOf(`${d.city}, ${d.state}`)]['population']}`)
        d3.select('.pmConcentration').html(`${data[cities.indexOf(`${d.city}, ${d.state}`)]['weighted_pollution_2016']}`)
        d3.select('.pmLife').html(`${data[cities.indexOf(`${d.city}, ${d.state}`)]['llpp_who_2016']} Yrs`).style('color',colorScale(data[cities.indexOf(`${d.city}, ${d.state}`)]['llpp_who_2016']))
      })
      .on('mousemove', (d:any) => {
        d3.select('.tooltip')
          .style('left',`${d3.event.pageX + 20}px`)
          .style('top',`${d3.event.pageY - 30}px`)
      })
      .on('mouseleave',() =>{
        d3.select('.tooltip')
          .style('display','none')
      })
    function tick(){
      d3.selectAll('.cityCircle')
        .attr('cx', (d:any) => d.x)
        .attr('cy', (d:any) => d.y)  
    }
    d3.forceSimulation(centroidData)
      .force("x", d3.forceX((d:any) =>  d.centroid[0]))
      .force("y", d3.forceY((d:any) => d.centroid[1]))
      .force("collide", d3.forceCollide((d:any) => d.radius))
      .on('tick', tick)
  }
  
  render(){
    return (
      <div className='donut'>
        <svg width={this.props.width} height={this.props.height} ref={node => this.node = node} >
        </svg>
      </div>
    )
  }

}


export default ProjectCards