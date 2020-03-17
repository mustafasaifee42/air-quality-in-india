import React, { Component } from 'react';
import './css/barChart.css'

class ProjectCards extends Component <{ width:number , height:number ,  padding:number , data:{key:string , value:number , min_value: number, max_value: number}[] , range:number[] },{}>{
    
  node!: SVGSVGElement | null;
  render(){
    const scaleValue = this.props.height / (this.props.range[1] - this.props.range[0])
    const wid = (this.props.width  - (this.props.padding * this.props.data.length))/ this.props.data.length 
    const tickValue = [250,500,750,1000,1250]
    let bars = this.props.data.map((d:{key:string , value:number , min_value: number, max_value: number},i:number) => {
      return ( <rect 
        key={i}
        x={i * (wid + this.props.padding) + this.props.padding}
        y={this.props.height - (d.value * scaleValue)}
        height={d.value * scaleValue}
        width={wid}
        fill={'#b51d1d'}
      />)
    })
    let text = this.props.data.map((d:{key:string , value:number , min_value: number, max_value: number},i:number) => {
      return ( 
        <text 
          key={i}
          x={i * (wid + this.props.padding) + wid / 2 + this.props.padding}
          y={this.props.height + 15}
          fontFamily={'IBM Plex Sans'}
          fontSize={'14px'}
          textAnchor={'middle'}
          fill={'#414141'}
        >
          {d.key}
        </text>    
      )
    })
    let textLabel = this.props.data.map((d:{key:string , value:number , min_value: number, max_value: number},i:number) => {
      return ( 
        <text 
          key={i}
          x={i * (wid + this.props.padding) + wid / 2 + this.props.padding}
          y={this.props.height - (d.value * scaleValue) - 5}
          fontFamily={'IBM Plex Sans'}
          fontSize={'12px'}
          textAnchor={'middle'}
          fontWeight={'bold'}
          fill={'#b51d1d'}
        >
          {`${d.value.toFixed(1)}`}
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
          {`${d}`}
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
      <div className='barChart'>
        <div className='graphTitle'>Death rate because of air pollution per 100,000 in India in 2017 <span className="graphSubnote">(estimates with 95% uncertainty intervals)</span></div>
        <svg width={this.props.width  + this.props.padding / 2} height={this.props.height + 20} ref={node => this.node = node} >
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