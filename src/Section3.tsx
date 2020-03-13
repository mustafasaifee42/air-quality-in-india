import React, { useState } from 'react';
import DorlingCartoGram from './DorlingCartoGram';
import CartoGram from './CartoGram';
import ColumnChartGainInLife from './ColumnChartGainInLife';
import './css/cartogram.css';
import './css/tooltip.css';
import Chloropleth from './img/chloropleth.svg';
import DorlingCartogram from './img/dorlingCartogram.svg';
const data:{"state":string,"population": number,"weighted_pollution_2016": number,"llpp_who_2016": number,"llpp_2016":number,"city": string,"Total Years Lost": number}[] = require('./data/AQLIData.json')

const Header: React.FunctionComponent<{windowWidthValue:number}>  = (props) =>{
  let total = [
    {
      'key': '< 0.1',
      'value':0
    },
    {
      'key': '0.1-1',
      'value':0
    },
    {
      'key': '1-2',
      'value':0
    },
    {
      'key': '2-3',
      'value':0
    },
    {
      'key': '3-4',
      'value':0
    },
    {
      'key': '4-5',
      'value':0
    },
    {
      'key': '5-6',
      'value':0
    },
    {
      'key': '6-7',
      'value':0
    },
    {
      'key': '7-8',
      'value':0
    },
    {
      'key': '8-9',
      'value':0
    },
    {
      'key': '9-10',
      'value':0
    },
    {
      'key': '>= 10',
      'value':0
    },
  ]
  data.forEach((d:{"state":string,"population": number,"weighted_pollution_2016": number,"llpp_who_2016": number,"llpp_2016":number,"city": string,"Total Years Lost": number},i:number) => {
    if(d.llpp_who_2016 >= 0.1){
      if(d.llpp_who_2016 >= 10)
        total[11]['value'] = total[11]['value'] + d.population
      else {
        let indx = Math.ceil(d.llpp_who_2016)
        total[indx]['value'] = total[indx]['value'] + d.population
      }
    }
    else {
      total[0]['value'] = total[0]['value'] + d.population
    }
  })
  console.log(total)
  let totalPopulation = 0,intPopulation = 0
  total.forEach((el:{value:number},i:number) => {
    totalPopulation = totalPopulation  + el.value;
    if(i > 5)
      intPopulation = intPopulation + el.value
  })
  console.log(totalPopulation,intPopulation, intPopulation * 100 / totalPopulation)
  const [ mapSelection , setMapSelection ] = useState('cartogram')
  let map = <CartoGram 
    width={680}
    height={720}
    scale={1250}
    translate={[-1445, 880]}
  />
  if (mapSelection === 'cartogram') {
    map =  <DorlingCartoGram 
      width={680}
      height={720}
      scale={1250}
      translate={[-1445, 880]}
      maxRadius={35}
    />

  }
  let chartWidth = 680 , padding = 20, fixedValue = 2, fontSize = 12;
  if(props.windowWidthValue < 720) {
    chartWidth = props.windowWidthValue - 60;
    padding = 10;
    fixedValue = 1;
    fontSize = 10;
    map = <img alt="chloropleth" src={Chloropleth} width={'100%'} />
    if (mapSelection === 'cartogram') {
      map = <img alt="dorling cartogram" src={DorlingCartogram} width={'100%'} />
    }
  }
  return (
    <div>
      <div className="container section" id='Section3'>
        <div className='section-title'>
          Impact on Life Expectancy
        </div>
        <div className='content'>
          Majority of the death caused by air pollution are caused because of the excess exposure to particulate matter. Excess exposure to PM2.5 adversely effects life expectancy. Produced by the Energy Policy Institute at the University of Chicago (EPIC), <a href="https://aqli.epic.uchicago.edu/" rel="noopener noreferrer" target="_blank">Air Quality Life Index (AQLI)</a> converts air pollution concentrations into its impact on life expectancy. 
          <br />
          <br />
          <span className='italics'>AQLI measures the potential gain in life expectancy if the reduced air pollution to comply with the World Health Organization guideline <span className="bold">(PM 2.5 concentrations: {`<`} 10 µg/m3)</span>.</span>
          <div className='quote red'>Particulate pollution reduces the life expectancy of a typical Indian by <span className="bold">4.3 years</span></div>
          <div className='quote red'><span className="bold">{(intPopulation * 100 / totalPopulation).toFixed(1)}% (around 1 in 3)</span> people live alteast 5 yrs less because of pollution</div>
          Since life expectancy at birth is currently 69 years in India, this suggests that reducing particulate pollution to the WHO guideline throughout the country would raise the average life expectancy to 73 (accroding to the data from 2016).  
          <br />
          <br/>
          <ColumnChartGainInLife
            width={chartWidth}
            height={500}
            padding = {padding}
            range = {[0,375000000]}
            data={total}
            fixedValue={fixedValue}
            fontSize={fontSize}
          />
          
          <div className='quote red'>If WHO guidelines were met in Delhi the gain in life expectancy would have been <span className="bold">10.2 yrs</span> (13.9% for the current life expectancy in Delhi)</div>
          The visualization visualizes how many years of life expectancy are lost in different regions in India under current pollution levels.
          <div className='mapTitleContainer'>
            <div className='mapTitle'>Gain in Life Expectancy if WHO guidelines are met</div>
            <div className='selctionButtonDiv'>
              <div className = { mapSelection === 'cartogram' ? "selctionButton selected" : "selctionButton"} onClick={() => { setMapSelection('cartogram') }}>Cartogram Map</div>
              <div className= { mapSelection === 'geographical' ? "selctionButton selected" : "selctionButton"} onClick={() => { setMapSelection('geographical') }}>Geographical Map</div>
            </div>
          </div>
          {map}
          <div className='MapsubNote'>All data is from 2016. Source: <a href="https://aqli.epic.uchicago.edu/" rel="noopener noreferrer" target="_blank">Air Quality Life Index</a></div>
          <hr />
        </div>
      </div>
      <div className='tooltip'>
        <div className='tooltipTitle bold'>City, India</div>
        <div className='tooltipPopulation'>City, India</div>
        <div className='tooltipConcentration'>
          <div className='tooltipHead'>PM 2.5 (µg/m3)</div>
          <div className='bold pmConcentration'>10</div>
        </div>
        <div className='tooltipConcentration'>
          <div className='tooltipHead'>Gain in life expectancy</div>
          <div className='bold pmLife'>10</div>
        </div>
      </div>
    </div>
  );
};

export default Header;