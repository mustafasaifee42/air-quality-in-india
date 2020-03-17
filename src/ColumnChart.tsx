import React, { Component } from 'react';
import './css/barChart.css'

class ProjectCards extends Component <{ width:number , height:number ,  padding:number , data:{key:string , value:number , min_value: number, max_value: number}[] , range:number[] , rotation:number },{}>{
    
  node!: SVGSVGElement | null;
  render(){
    const scaleValue = this.props.height / (this.props.range[1] - this.props.range[0])
    const wid = (this.props.width  - (this.props.padding * this.props.data.length))/ this.props.data.length 
    const tickValue = [250000,500000,750000,1000000,1250000,1500000,1750000]
    let bars = this.props.data.map((d:{key:string , value:number , min_value: number, max_value: number},i:number) => {
      let color = '#ccc'
      if(d.key === 'Air pollution')
        color = '#b51d1d'
      return ( <rect 
        key={i}
        x={i * (wid + this.props.padding) + this.props.padding}
        y={this.props.height - (d.value * scaleValue)}
        height={d.value * scaleValue}
        width={wid}
        fill={color}
      />)
    })
    let text = this.props.data.map((d:{key:string , value:number , min_value: number, max_value: number},i:number) => {
      let color = '#ccc'
      if(d.key === 'Air pollution')
        color = '#b51d1d'
      return ( 
        <text 
          key={i}
          fontFamily={'IBM Plex Sans'}
          fontSize={'14px'}
          textAnchor={this.props.rotation === 90 ? "start" : "middle"}
          fill={color}
          transform={`translate(${i * (wid + this.props.padding) + wid / 2 + this.props.padding - (this.props.rotation / 20)},${this.props.height + 15 - (this.props.rotation / 9)}) rotate(${this.props.rotation})`}
        >
          {d.key}
        </text>    
      )
    })
    let textLabel = this.props.data.map((d:{key:string , value:number , min_value: number, max_value: number},i:number) => {
      let color = '#ccc'
      if(d.key === 'Air pollution')
        color = '#b51d1d'
      return ( 
        <text 
          key={i}
          x={i * (wid + this.props.padding) + wid / 2 + this.props.padding}
          y={this.props.height - (d.value * scaleValue) - 5}
          fontFamily={'IBM Plex Sans'}
          fontSize={'12px'}
          textAnchor={'middle'}
          fontWeight={'bold'}
          fill={color}
        >
          {`${(d.value / 1000000).toFixed(2)} M`}
        </text>    
      )
    })
    let lineMaxMin = this.props.data.map((d:{key:string , value:number , min_value: number, max_value: number},i:number) => {
      return ( 
        <line 
          key={i}
          x1={i * (wid + this.props.padding) + wid / 2 + this.props.padding}
          y1={this.props.height - (d.min_value * scaleValue)}
          x2={i * (wid + this.props.padding) + wid / 2 + this.props.padding}
          y2={this.props.height - (d.max_value * scaleValue)}
          stroke={'#111'}
          strokeWidth={1}
          fill={'none'}
        />    
      )
    })
    let axisLine = tickValue.map((d:number,i:number) => {
      return ( 
        <line 
          key={i}
          x1={0}
          x2={this.props.width  + this.props.padding / 2}
          y1={this.props.height - (d * scaleValue)}
          y2={this.props.height - (d * scaleValue)}
          stroke={'#aaa'}
          strokeWidth={1}
          strokeDasharray={'2 4'}
          fill={'none'}
        />    
      )
    })
    let textAxis = tickValue.map((d:number,i:number) => {
      return ( 
        <text 
          key={i}
          x={1}
          y={this.props.height - (d * scaleValue) - 5}
          fontFamily={'IBM Plex Sans'}
          fontSize={'10px'}
          fill={'#aaa'}
        >
          {`${(d / 1000000).toFixed(2)} M`}
        </text>    
      )
    })
    let lineMax = this.props.data.map((d:{key:string , value:number , min_value: number, max_value: number},i:number) => {
      return ( 
        <line 
          key={i}
          x1={i * (wid + this.props.padding) + wid / 2 + this.props.padding - 5}
          y1={this.props.height - (d.max_value * scaleValue)}
          x2={i * (wid + this.props.padding) + wid / 2 + this.props.padding + 5}
          y2={this.props.height - (d.max_value * scaleValue)}
          stroke={'#111'}
          strokeWidth={1}
          fill={'none'}
        />    
      )
    })
    let lineMin = this.props.data.map((d:{key:string , value:number , min_value: number, max_value: number},i:number) => {
      return ( 
        <line 
          key={i}
          x1={i * (wid + this.props.padding) + wid / 2 + this.props.padding - 5}
          y1={this.props.height - (d.min_value * scaleValue)}
          x2={i * (wid + this.props.padding) + wid / 2 + this.props.padding + 5}
          y2={this.props.height - (d.min_value * scaleValue)}
          stroke={'#111'}
          strokeWidth={1}
          fill={'none'}
        />    
      )
    })
    return (
      <div className='barChart barChartBig'>
        <div className='graphTitle'>Top 10 causes of premature deaths in India in 2017<span className="graphSubnote">(estimates with 95% uncertainty intervals)</span></div>
        <svg width={this.props.width  + this.props.padding / 2} height={this.props.height + 20 + this.props.rotation} ref={node => this.node = node} >
          {axisLine}
          {textAxis}
          {bars}
          <line 
            x1={0}
            y1={this.props.height}
            x2={this.props.width  + this.props.padding / 2}
            y2={this.props.height}
            stroke={'#333'}
            strokeWidth={1}
            fill={'none'}
          />  
          {lineMaxMin}
          {lineMax}
          {lineMin}
          {text}
          {textLabel}
        </svg>
      </div>
    )
  }
}
export default ProjectCards