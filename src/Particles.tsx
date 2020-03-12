import React, { useEffect } from 'react';
import { select } from 'd3-selection';
import * as d3 from 'd3';


let drawCanvas = (props:{width:number, height:number, density:number, id:string, note: string}) => {
  const fill:string = 'rgba(5, 5, 5, 0.5)',
    stroke:string = 'rgba(255,255,255, 1)',
    width:number = props.width, 
    height:number = props.height,
    radiusMin:number = 2, 
    radiusMax:number =  4;
  select(`#${props.id}`).selectAll('canvas').remove();
  select(`#${props.id}`).selectAll('div').remove();
  const canvas:any = select(`#${props.id}`).append('canvas')
      .attr('width', `${width}px`)
      .attr('height', `${height}px`);
  
  const context:any = canvas.node().getContext('2d');

  const nodes:{r:number, x:number, y:number, dx:number, dy:number}[] = d3.range(props.density).map(function() {
    return {
      r: Math.round(Math.random() * (radiusMax - radiusMin) + radiusMin),
      x: Math.round(Math.random() * width),
      y: Math.round(Math.random() * height),
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    };
  });

  let  getBounds = () =>  {
    return {
      get w() {
        return width;
      },
      get h() {
        return height
      },
      get x() {
        return [(width - this.w) / 2, (width + this.w) / 2];
      },
      get y() {
        return [(height - this.h) / 2, (height + this.h) / 2];
      }
    }
  }

  let  draw = () => {
    context.clearRect(0, 0, width, height)
    // background rect
    context.beginPath();
    context.strokeStyle = stroke;
    context.rect(getBounds().x[0], getBounds().y[0], getBounds().w, getBounds().h);
    context.stroke();
  
    // circles
    for (let i = 0; i < nodes.length; ++i) {
      context.beginPath()
      context.fillStyle = fill
      context.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, 2 * Math.PI)
      context.fill()
    }
  }

  d3.timer(floating);

  function floating() {

    nodes.forEach(d => {
      d.x += d.dx; if (d.x > getBounds().x[1] || d.x < getBounds().x[0]) d.dx *= -1;
      d.y += d.dy; if (d.y > getBounds().y[1] || d.y < getBounds().y[0]) d.dy *= -1;
    });
    
    draw();
  }
      
  let textDiv:any  = select(`#${props.id}`).append('div')
    .attr('class','textDiv')
  textDiv.append('div')
    .attr('class','textDiv1')
    .html(props.note)
}

const Particles: React.FunctionComponent<{width:number, height:number, density:number, id:string, note: string}> = (props) => {
  useEffect(() => {
    drawCanvas(props)
  })
  return (
    <div id={props.id} className='particleDiv' style={{'width':`${props.width}px`}}/>
  )
}
export default Particles;
