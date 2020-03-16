import React, { Component } from 'react';
import './css/barChart.css'

class ProjectCards extends Component <{ width:number , height:number ,  padding:number , data:{key:string , value:number}[] , range:number[] ,fontSize:number,fixedValue:number },{}>{
    
  node!: SVGSVGElement | null;
  render(){
    const scaleValue = this.props.height / (this.props.range[1] - this.props.range[0])
    const wid = (this.props.width  - (this.props.padding * this.props.data.length))/ this.props.data.length 
    const tickValue = [50000000,100000000,150000000,200000000,250000000,300000000,350000000]
    let bars = this.props.data.map((d:{key:string , value:number},i:number) => {
      return ( <rect 
        key={i}
        x={i * (wid + this.props.padding) + this.props.padding}
        y={this.props.height - (d.value * scaleValue)}
        height={d.value * scaleValue}
        width={wid}
        fill={'#b51d1d'}
      />)
    })
    let text = this.props.data.map((d:{key:string , value:number},i:number) => {
      return ( 
        <text 
          key={i}
          x={i * (wid + this.props.padding) + wid / 2 + this.props.padding}
          y={this.props.height + 15}
          fontFamily={'IBM Plex Sans'}
          fontSize={'12px'}
          textAnchor={'middle'}
          fill={'#ccc'}
        >
          {d.key}
        </text>    
      )
    })
    let textLabel = this.props.data.map((d:{key:string , value:number},i:number) => {
      return ( 
        <text 
          key={i}
          x={i * (wid + this.props.padding) + wid / 2 + this.props.padding}
          y={this.props.height - (d.value * scaleValue) - 5}
          fontFamily={'IBM Plex Sans'}
          fontSize={`${this.props.fontSize}px`}
          textAnchor={'middle'}
          fill={'#b51d1d'}
        >
          {`${(d.value / 1000000).toFixed(this.props.fixedValue)} M`}
        </text>    
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
      let txt  = `${(d / 1000000)} M`
      if(i === 6)
        txt = `${(d / 1000000)} Million people`
      return ( 
        <text 
          key={i}
          x={1}
          y={this.props.height - (d * scaleValue) - 5}
          fontFamily={'IBM Plex Sans'}
          fontSize={'10px'}
          fill={'#aaa'}
        >
          {txt}
        </text>    
      )
    })
    return (
      <div className='barChart'>
        <div className='graphTitle'>Extent of the effect of air pollution on life expectancy in India</div>
        <svg width={this.props.width  + this.props.padding / 2} height={this.props.height + 50} ref={node => this.node = node} >
          
          <text 
            x={this.props.width / 2}
            y={this.props.height + 40}
            fontFamily={'IBM Plex Sans'}
            fontSize={'14px'}
            fill={'#414141'}
            textAnchor={'middle'}
          >
            Potential gain in life expectancy relative to WHO guidelines
          </text> 
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
          {text}
          {textLabel}
        </svg>
      </div>
    )
  }
}
export default ProjectCards