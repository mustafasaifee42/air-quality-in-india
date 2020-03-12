import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleThreshold } from 'd3-scale';
import './css/strips.css'

export class Strips extends Component <{width:number , barheight:number , fileName:string  },{}> {
  node!: SVGSVGElement;
  divNode!:any;
  componentDidMount(){
    
    const svg  = select(this.node)
    const g = svg.append('g').attr('class','graphG')
    g.append('rect')
      .attr('y', 0)
      .attr('x', 0)
      .attr('width', this.props.width)
      .attr('height', this.props.barheight)
      .attr('fill','#eee')

  }
  drawGraph = (data:{ city_ASCII:string , country:string , data:{ dayNo:number , min:number , max:number , avg:number }[] }) => { 
    const axis:number[] = [12,35.4,55.4,150.4,250.4,500]
    const colorScale = scaleThreshold()
      .domain(axis)
      .range([0,1,2,3,4,5,6,7])
    const color:string[] = ["#d4e8c1","#f3c654","#f28124","#c94227","#a42614","#800000","#440012"]
    
    const svg  = select(this.node)

    svg.select('.graphG').remove();
    const g = svg.append('g').attr('class','graphG')
    g.append('rect')
      .attr('y', 0)
      .attr('x', 0)
      .attr('width', this.props.width)
      .attr('height', this.props.barheight)
      .attr('fill','#eee')

    g.selectAll('.dataSquare')
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
    g.selectAll('.xAxesText')
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
    
    if(this.props.fileName !== ''){
        fetch(`./dataFiles/${this.props.fileName}.json`)
          .then(response => response.json())
          .then(data => {
            this.drawGraph(data)
          });
      }
    return (
      <div className='strips' style={divStyle}>
          <svg width={this.props.width} height={this.props.barheight + 15} ref={(node: SVGSVGElement) => this.node = node} />
      </div>
    );
  }
};

export default Strips;