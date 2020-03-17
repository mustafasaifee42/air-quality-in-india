import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear, scaleThreshold } from 'd3-scale';
import './css/graphStyle.css';

export class Particles extends Component <{ fileName:string , height:number , width:number , leftPadding:number },{}> {
  node!: SVGSVGElement;
  drawGraph = (data:{ city_ASCII:string , country:string , data:{ dayNo:number , min:number , max:number , avg:number }[] }) => { 
    const svg  = select(this.node)
    const g = svg.append('g')
    const axis:number[] = [12,35.4,55.4,150.4,250.4,500]
    const colorScale = scaleThreshold()
      .domain(axis)
      .range([0,1,2,3,4,5,6,7])
    const color:string[] = ["#d4e8c1","#f3c654","#f28124","#c94227","#a42614","#800000","#440012"]
    const heightScale = scaleLinear()
      .domain([0, 600])
      .range([0, this.props.height - 20]);

    g.append('rect')
      .attr('x', this.props.leftPadding + 274 * (this.props.width - this.props.leftPadding) / 365)
      .attr('y', 0)
      .attr('width', this.props.leftPadding + 61 * (this.props.width - this.props.leftPadding) / 365)
      .attr('height', this.props.height - 20)
      .attr('fill','#f1f1f1')

    g.selectAll('.axesLines')
      .data(axis)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('y1', (d:number) => this.props.height - heightScale(d) - 20)
      .attr('x2', this.props.width)
      .attr('y2', (d:number) => this.props.height - heightScale(d) - 20)
      .attr('stroke','#aaa')
      .attr('stroke-width',1)
      .attr('stroke-dasharray',"2 4")
      .attr('class', 'axesLines');
    g.selectAll('.bars')
      .data(data.data)
      .enter()
      .append('rect')
      .attr('x', (d:{dayNo:number}) => this.props.leftPadding + d.dayNo * (this.props.width - this.props.leftPadding) / 365)
      .attr('y', (d:{avg:number}) => this.props.height - heightScale(d.avg) - 20)
      .attr('width', (this.props.width - this.props.leftPadding) / 365)
      .attr('height', (d:{avg:number}) => heightScale(d.avg))
      .attr('fill',(d:{avg:number}) => color[colorScale(d.avg)])
      .attr('class', 'bars');
    g.selectAll('.axesText')
      .data(axis)
      .enter()
      .append('text')
      .attr('x', 0)
      .attr('y', (d:number) => this.props.height - heightScale(d) - 20)
      .attr('dy', -5)
      .attr('fill','#aaa')
      .attr('font-family','IBM Plex Sans')
      .attr('font-size',10)
      .text((d:number) => {
        if (d === 500) 
          return `${d}μg/m3`
        return d
      });
    const dayAxes = [1, 91, 182,274, 335]
    const month = ['Jan', 'Apr', 'Jul','Oct', 'Dec']
    g.append('line')
      .attr('x1', 0)
      .attr('y1', this.props.height - heightScale(0) - 20)
      .attr('x2', this.props.width)
      .attr('y2', this.props.height - heightScale(0) - 20)
      .attr('stroke','#666')
      .attr('stroke-width',1);
    g.selectAll('.xAxesText')
      .data(dayAxes)
      .enter()
      .append('text')
      .attr('x', (d:number) => this.props.leftPadding + d * (this.props.width - this.props.leftPadding) / 365)
      .attr('y', this.props.height - heightScale(0) - 20)
      .attr('dy', 15)
      .attr('fill','#aaa')
      .attr('font-family','IBM Plex Sans')
      .attr('font-size',10)
      .attr('class','xAxesText')
      .attr('text-anchor',(d:number,i:number) =>{
        if(i === 0)
          return 'start'
        if(i === 4)
          return 'end'
        return 'middle'
      })
      .text((d:number,i:number) => month[i]);
    let avgForGraph:number = 0, totalDays:number =  0, unhealthyDays:number = 0, HazardousDays:number = 0
    data.data.forEach(d => {
      if(d.avg) {
        avgForGraph = avgForGraph + d.avg
        totalDays++
        if(d.avg > 35.4)
          unhealthyDays++
        if(d.avg > 250)
          HazardousDays++
      }
    })
    avgForGraph = avgForGraph / totalDays
    g.append('line')
      .attr('x1', 0)
      .attr('y1', this.props.height - heightScale(avgForGraph) - 20)
      .attr('x2', this.props.width)
      .attr('y2', this.props.height - heightScale(avgForGraph) - 20)
      .attr('stroke','#333')
      .attr('stroke-width',1);
    g.append('text')
      .attr('x', 0)
      .attr('y', this.props.height - heightScale(avgForGraph) - 20)
      .attr('dy', 10)
      .attr('fill', '#333')
      .attr('font-family','IBM Plex Sans')
      .attr('font-size',10)
      .text('Year Avg.');
    g.append('text')
      .attr('x', 0)
      .attr('y', this.props.height - heightScale(avgForGraph) - 20)
      .attr('dy', -2)
      .attr('fill', '#333')
      .attr('font-family','IBM Plex Sans')
      .attr('font-size',12)
      .attr('font-weight','bold')
      .text(`${avgForGraph.toFixed(1)}μg/m3`);
    g.append('text')
      .attr('x', this.props.leftPadding)
      .attr('y', 100)
      .attr('dy', 12)
      .attr('fill', '#333')
      .attr('font-family','IBM Plex Sans')
      .attr('font-size',14)
      .text(`No. of days with unhealthy PM 2.5 levels:`);
    g.append('text')
      .attr('x', this.props.leftPadding + 258)
      .attr('y', 100)
      .attr('dy', 12)
      .attr('fill', '#333')
      .attr('font-family','IBM Plex Sans')
      .attr('font-size',16)
      .attr('font-weight','bold')
      .text(unhealthyDays);
    g.append('text')
      .attr('x', this.props.leftPadding)
      .attr('y', 120)
      .attr('dy', 12)
      .attr('fill', '#333')
      .attr('font-family','IBM Plex Sans')
      .attr('font-size',14)
      .text(`Out of which ${HazardousDays} days had Hazardous levels`);
    g.append('text')
      .attr('x', this.props.leftPadding + 274 * (this.props.width - this.props.leftPadding) / 365 - 15)
      .attr('y', 230)
      .attr('fill', '#999')
      .attr('font-family','IBM Plex Sans')
      .attr('font-size',14)
      .attr('font-style','italic')
      .attr('text-anchor','end')
      .text('October-November historically are the worst');
      
    g.append('text')
      .attr('x', this.props.leftPadding + 274 * (this.props.width - this.props.leftPadding) / 365 - 15)
      .attr('y', 250)
      .attr('fill', '#999')
      .attr('font-family','IBM Plex Sans')
      .attr('font-size',14)
      .attr('font-style','italic')
      .attr('text-anchor','end')
      .text('period of air quality each year in Delhi');
    


  }
  componentDidMount(){
    if(this.props.fileName){
      
      fetch(this.props.fileName)
        .then(response => response.json())
        .then(data => {
          this.drawGraph(data)
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }

  render() {
    return (
      <div>
        <svg width={this.props.width} height={this.props.height} ref={(node: SVGSVGElement) => this.node = node} />
      </div>
    )
  }
}

export default Particles;
