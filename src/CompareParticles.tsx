import React, { useEffect , useState } from 'react';
import * as d3 from 'd3';
import { select } from 'd3-selection';
import Select from "react-dropdown-select";


let startDraw = (density:number, wid:number, hght:number) => {
  const fill:string = 'rgba(5, 5, 5, 0.5)',
    stroke:string = 'rgba(255,255,255, 1)',
    width:number = wid, 
    height:number = hght,
    radiusMin:number = 2, 
    radiusMax:number =  4;
  let den = density === -1 ? 15: density;
  let txt = density === -1 ? '-': `${density}`;
  const canvas:any = select(`#compareParticleCanvas`)
  canvas.attr('width',`${wid}px`).attr('height',`${hght}px`)
  const context:any = canvas.node().getContext('2d');
  const nodes:{r:number, x:number, y:number, dx:number, dy:number}[] = d3.range(den).map(function() {
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

  select('.dataValue')
    .html(txt)

}

const Particles: React.FunctionComponent<{width:number, height:number, options:{label:string , value:string, data:number}[] }> = (props) => {
  const [density, setDensityy] = useState(-1)
  useEffect(() => {
    startDraw(density,props.width, props.height)
  })
  return (
    <div className='particleDiv'>
      <canvas width={`${props.width}px`} height={`${props.height}px`}  id='compareParticleCanvas' />
      <div className='textDivWithSelector'>
        <div className='textDiv1'>
          Most polluted day last year in
          <Select
            options={props.options}
            onChange={(value:any) => { setDensityy(value[0].data)}}
            values={[]}
            placeholder="Select a city to compare"
            dropdownHeight='250px'
            dropdownPosition="auto"              
          />
          <span className='bold'>PM 2.5 level: <span className='dataValue'>-</span> µg/m3</span>
        </div>
      </div>
    </div>
  )
}

export default Particles;
