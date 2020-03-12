import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleThreshold } from 'd3-scale';
import './css/strips.css'

export class Strips extends Component <{width:number , barheight:number , city:string  },{}> {
  node!: SVGSVGElement;
  divNode!:any;
  componentDidMount(){
    fetch(`./dataFiles/${this.props.city}.json`)
      .then(response => response.json())
      .then(data => {
        this.drawGraph(data)
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }
  drawGraph = (data:{ city_ASCII:string , country:string , data:{ dayNo:number , min:number , max:number , avg:number }[] }) => { 
    const axis:number[] = [12,35.4,55.4,150.4,250.4,500]
    const colorScale = scaleThreshold()
      .domain(axis)
      .range([0,1,2,3,4,5,6,7])
    const color:string[] = ["#d4e8c1","#f3c654","#f28124","#c94227","#a42614","#800000","#440012"]
    
    const svg  = select(this.node)

    svg.append('rect')
      .attr('y', 0)
      .attr('x', 0)
      .attr('width', this.props.width)
      .attr('height', this.props.barheight)
      .attr('fill','#eee')

    svg.selectAll('.dataSquare')
      .data(data.data)
      .enter()
      .append('rect')
      .attr('y', 0)
      .attr('x',(d:{ dayNo:number , min:number , max:number , avg:number }, i:number) => d.dayNo * this.props.width / 365)
      .attr('width', this.props.width / 365)
      .attr('height', this.props.barheight)
      .attr('fill',(d:{ dayNo:number , min:number , max:number , avg:number }) => {
        if((d.avg !== -1) && (d.avg !== null))
          return color[colorScale(d.avg)]
        return '#eee'
      })
    
    const dayAxes:number[] = [0, 90, 181,273, 334]
    const month:string[] = ['Jan', 'Apr', 'Jul','Oct', 'Dec']
     svg.selectAll('.xAxesText')
      .data(dayAxes)
      .enter()
      .append('text')
      .attr('x', (d:number) => d  * this.props.width / 365)
      .attr('y', this.props.barheight)
      .attr('dy', 10)
      .attr('fill','#aaa')
      .attr('font-family','IBM Plex Sans')
      .attr('font-size',10)
      .attr('class','xAxesText')
      .text((d:number,i:number) => month[i]);

    
    let unhealthyDays:number = 0;
    data.data.forEach(d => {
      if(d.avg) {
        if(d.avg > 35.4)
          unhealthyDays++
      }
    })
    select(this.divNode)
      .html(unhealthyDays.toString())
  }
  render(){
    const divStyle = {
      width: this.props.width
    }
    return (
      <div className='strips' style={divStyle}>
        <div className='headArea' style={divStyle}>
          <div className='cityName bold'>{this.props.city}</div>
          <div className='infoText'>No. of day with unhealthy levels: <span className='bold unhealthyLevel' ref={(node) => this.divNode = node}>0</span></div>
        </div>
        <div>
          <svg width={this.props.width} height={this.props.barheight + 15} ref={(node: SVGSVGElement) => this.node = node} />
        </div>
      </div>
    );
  }
};

export default Strips;