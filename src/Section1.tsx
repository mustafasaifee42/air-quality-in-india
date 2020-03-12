import React, { useState } from 'react';
import Particles from './Particles';
import CompareParticles from './CompareParticles';
import AirPollutionBarChart from './AirPollutionBarChart';
import AirPollutionBarChartCompare from './AirPollutionBarChartCompare';
import Select from "react-dropdown-select";
import MaxValueData from './data/maxValueData.json';
import Strips from './Strips';
import StripsCompare from './StripsCompare';
import key from './img/key.svg';
import key1 from './img/key1.svg';
import './css/particle.css'
const Section1: React.FunctionComponent<{windowWidthValue:number}>  = (props) => {
  const [ fileName , setFileName ] = useState('')
  const [ value, setValue ] = useState('')
  const options:any = MaxValueData.map((d:any, i: number) => {
    return {
      'label': `${d.city}`,
      'value': `${i}`,
      'data':d.max_val,
    }
  })
  const windowWidth = props.windowWidthValue;
  let particleWidth = 350, particleHeight = 600;

  if(props.windowWidthValue < 1460) {
    particleWidth = (props.windowWidthValue - 40) / 4
  }

  if(props.windowWidthValue < 1000) {
    particleWidth = props.windowWidthValue - 0;
    particleHeight = 400
  }

  let graphWidth = 680, stripWidth = 1440
  if (windowWidth < 320 * 2 + 100){
    graphWidth = props.windowWidthValue - 60
  }
  else {
    graphWidth = (props.windowWidthValue - 120) / 2
  }
  if (graphWidth > 680) graphWidth = 680

  if(windowWidth < 1440) stripWidth = windowWidth - 40 
  const cityList:string[] = ['Gurgaon, India','Ghaziabad, India','Faridabad, India', 'Bhiwandi, India', 'Noida, India','Patna, India','Lucknow, India']
  let cityStrip = cityList.map((d:string,i:number) => {
    return ( 
      <Strips
        key ={i}
        width={stripWidth}
        barheight={50}
        city={d}
      />
    )
  })
  return (
    <div>
      <div className="container section" id='Section1'>
        <div className='section-title'>
          Air Quality in India
        </div>
        <div className='content content-with-viz'>
          Air pollution is amongst the top threats to global health, World Health Organization has said [<a href="https://www.who.int/news-room/feature-stories/ten-threats-to-global-health-in-2019" rel="noopener noreferrer" target="_blank">source here</a>]. India has one of the highest exposure levels to air pollution globally. In 2018, India was the <span className="bold">3rd</span> most polluted country in the world [<a href='https://www.airvisual.com/world-most-polluted-countries' rel="noopener noreferrer" target="_blank">source here</a>]. The annual exposure to ambient particulate matter, as the population-weighted mean PM2·5, in India in 2017 was one of the highest in the world [<a href="https://www.thelancet.com/journals/lanplh/article/PIIS2542-5196(18)30261-4/fulltext" target="_blank" rel="noopener noreferrer" >source here</a>].
          <br />
          <div className='quote red'>Delhi (with population over 26 million) is the most polluted national capital in the world.</div>
          Delhi (with population over 26 million) is the most polluted national capital in the world. On 3rd Nov. 2019 (the most polluted day of year) the 24-hr (daily) average ambient concentrations of PM 2.5 reached 538.8 µg/m3 (more than {Math.floor(539/12)} times than the acceptable standards). 
          <br />
          <br />
        </div>
      </div>
      <span className='italics figureNote'>The floating particles on the visulization below depicts PM 2.5 and its concentration over 24 hours. <span className="subNote">Visualization inspired by <a href="https://www.nytimes.com/interactive/2019/12/02/climate/air-pollution-compare-ar-ul.html" rel="noopener noreferrer" target="_blank">this New York Times article</a>.</span></span>            
      <div className='particleUnit'>
        <Particles 
          width={particleWidth}
          height={particleHeight}
          density={12}
          id={'particleSystemGood'}
          note={'Upper limit for “good” air quality,<br /><span class="bold">PM 2.5 level: 12 µg/m3</span>'}
        />
        <Particles 
          width={particleWidth}
          height={particleHeight}
          density={36}
          id={'particleSystemUnhealthy'}
          note={'Limit at which air starts being "unhealthy",<br /><span class="bold">PM 2.5 level: 35.5 µg/m3</span>'}
        />
        <Particles 
          width={particleWidth}
          height={particleHeight}
          density={539}
          id={'particleSystemDelhi'}
          note={'Most polluted day last year in Delhi region,<br /><span class="bold">PM 2.5 level: 538.8 µg/m3</span>'}
        />
        <CompareParticles
          options={options}
          width={particleWidth}
          height={particleHeight}
        />
      </div>
      <div className="container">
        October-November, was the worst period of air quality for 2019 in the Indian capital. The supreme court of India also slammed some state and centre government for its failure to improve air quality in Delhi NCR and said <span className='italics'>‘Delhi is worse than hell’</span> [<a href="https://www.hindustantimes.com/india-news/get-15-explosives-kill-people-at-one-go-sc-rebukes-centre-states-on-pollution/story-zv7hFJDndV2rlrfwvXz3rK.html" rel="noopener noreferrer" target="_blank">source here</a>].
        <br />
        <br />
      </div>
      <div className="keyImg" >
        <img alt="key" src={key} width={'100%'}/>
      </div>
      <div className='particleUnit'>
        <div className='graphContainer'>
          <div className='graphTitle'>New Delhi, India</div>
          <AirPollutionBarChart
            height = {500}
            width = {graphWidth} 
            fileName='./dataFiles/New Delhi, India.json'
            leftPadding={30}
          />
        </div>
        <div  className='graphContainer'>
          <Select
            options={options}
            onChange={(value:any) => { setFileName(value[0].label) ; setValue(value[0])}}
            values={[value]}
            addPlaceholder="Select a city to compare"
            dropdownHeight='250px'
            dropdownPosition="auto"              
          />
          <AirPollutionBarChartCompare
            height = {500}
            width = {graphWidth} 
            fileName={fileName}
            leftPadding={30}
          />
        </div>
      </div>
      <div className="container">
        Delhi, being the national capital gets a lot of attention but the some parts of India are even worse and others are not doing great as far as air quality is concerned. A <a href='https://www.airvisual.com/world-most-polluted-cities' rel="noopener noreferrer" target="_blank">study</a> by IQAir AirVisual and Greenpeace identified the cities with the worst air pollution (highest PM 2.5 concetration) in 2018.  
        <div className='quote red'><span className='bold'>7 out of 10</span> and <span className='bold'>22 of the 30</span>  most polluted cities are in India</div>
        <span className="bold">The list was toped by Gurugram (formerly known as Gurgaon), in south of Delhi, where the average PM 2.5 concetration is more than 13 times the accepted WHO standards.</span> The top 10 most polluted cities in India are all in North India. There is surge in the PM 2.5 levels during early winters in most of these cities and this pattern can be seen in most of the Northern cities in India.
        <br />
        <br />
        The visualization below visualizes the daily PM 2.5 concentration thoughout the year (2019) for the most polluted cities in India.
        <br />
        <br />
        <br />
      </div>
      <div className="keyImg" >
        <img alt="key" src={key1} width={'100%'}/>
      </div>
      {cityStrip}
      <div  style={{width: stripWidth , margin:'auto', marginTop:"5px" }}>
          <Select
            options={options}
            onChange={(value:any) => { setFileName(value[0].label) ; setValue(value[0])}}
            values={[value]}
            addPlaceholder="Select a city to compare"
            dropdownHeight='250px'
            dropdownPosition="auto"              
          />
          <StripsCompare
            width={stripWidth}
            barheight={50}
            fileName={fileName}
          />
      </div>
      <div className="container">
        <br/>
        <hr />
      </div>
    </div>
  );
};

export default Section1;