import React, {  useEffect  } from 'react';
import { select } from 'd3-selection';
import * as d3 from 'd3';
let node!: SVGSVGElement | null;


let createGraph = (props:{ width:number , height:number , radius:number , keyPos:number[] , value:number[] , color: string[] , total:number , keyValue:string[]}) => {
  select(node).selectAll('g').remove();
  const donutG =  select(node)
    .append('g')
    .attr('transform', `translate(${props.radius},${props.radius})`)
  const keyG = select(node)
    .append('g')
    .attr('transform', `translate(${props.keyPos[0]},${props.keyPos[1]})`)

  keyG.selectAll('.keySquare')
    .data(props.keyValue)
    .enter()
    .append('rect')
    .attr('class','keySquare')
    .attr('x',0)
    .attr('y',(d:string, i:number) => i * 25)
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill',(d:string,i:number) => props.color[i])
  keyG.selectAll('.keyText')
    .data(props.keyValue)
    .enter()
    .append('text')
    .attr('class','keyText')
    .attr('x',15)
    .attr('y',(d:string, i:number) => i * 25)
    .attr('dx',5)
    .attr('dy',13)
    .attr('fill',(d:string, i:number) => props.color[i])
    .attr('font-weight','bold')
    .attr('font-size',14)
    .attr('font-family','IBM Plex Sans')
    .text((d:string,i:number) => {
      return `${d} (est. ${(props.value[i]/ 1000000).toFixed(2)} Mil deaths)`
    })
  donutG.append('text')
    .attr("x",0)
    .attr('y',0)
    .attr('text-anchor','middle')
    .attr('font-weight','bold')
    .attr('font-size',42)
    .attr("fill", '#414141')
    .attr('font-family','IBM Plex Sans')
    .text(`${(props.total / 1000000).toFixed(2)} Mil`)
  donutG.append('text')
    .attr("x",0)
    .attr('y',0)
    .attr('text-anchor','middle')
    .attr('font-size',24)
    .attr('dy',30)
    .attr("fill", '#414141')
    .attr('font-family','IBM Plex Sans')
    .text('total death (est.)')
  let pie = d3.pie()
    .value((d:any) => d)
    .sort(null);
  
  const arc = d3.arc()
    .innerRadius(props.radius - 90)
    .outerRadius(props.radius - 50);

  const path = donutG.selectAll(".arcs")
    .data(pie(props.value))
    .enter()
    .append('g')
    .attr('class','arcs');

  
  path.append("path")
    .attr("d",(d:any) => (arc(d)))
    .attr("stroke","white")
    .attr("stroke-width",1)
    .attr("fill", (d:any, i:number) => props.color[i])


  
  path.append('text')
    .attr("transform",(d:any) => {
        let _d = arc.centroid(d);
        _d[0] *= 1.5;	//multiply by a constant factor
        _d[1] *= 1.5;	//multiply by a constant factor
        return "translate(" + _d + ")";
      })
    .attr("x",0)
    .attr('y',0)
    .attr('text-anchor','middle')
    .attr('font-size',16)
    .attr("fill", (d:any, i:number) => props.color[i])
    .attr('font-weight','bold')
    .attr('font-family','IBM Plex Sans')
    .text((d:any,i:any) => `${(props.value[i] * 100 / props.total).toFixed(1)}%`)
}


const Section1: React.FunctionComponent<{ width:number , height:number , radius:number , keyPos:number[] , value:number[] , color: string[] , total:number , keyValue:string[]}>  = (props) => {
  useEffect(() => {
    createGraph(props)
  })
  return (
    <div className='donut'>
      <svg width={props.width} height={props.height} ref={el => node = el} >
      </svg>
    </div>
  )
};

export default Section1;