import * as React from 'react';
import './css/table.css';

const Header: React.FunctionComponent<{}> = () => {
  return (
    <div className="container section" id='Intro'>
      <div className='content-table'>
        <div className='section-title'>
          Introduction
        </div>
        <div className='content'>
          Breathing is one of the most vital process for life. In a lifetime, an average human breaths about 250 million litres of air. We live in big cities and navigate the busy streets while breathing in air full of unwanted particles. 
          <br />
          <br />
          Today, air pollution is one of the world’s largest health and environmental problems. Air pollution is categorized in 2 categories
          <ol>
            <li>Indoor (household) air pollution</li>
            <li>Outdoor air pollution</li>
          </ol>
          <br />
          <span className='italics'>In this report we look in detail at the effect on outdoor particulate pollution (mainly PM2.5)</span>
          <br />
          <br />
          PM2.5 refers to atmospheric particulate matter (PM) that have a diameter of less than 2.5 micrometers, which is about 3% the diameter of a human hair. Because of its small size  PM2.5 are able to enter into the lungs and even the circulatory system. 
          <br />
          <br />
          <span className='bold'> <a href='https://www.epa.gov/' rel="noopener noreferrer" target='_blank'>US Environmental Protection Agency</a> stipulates that for good quality air the PM2.5 concentation must be less than 12μg/m3 averaged over 24 hours</span> [<a href="https://www.epa.gov/sites/production/files/2016-04/documents/2012_aqi_factsheet.pdf" rel="noopener noreferrer" target='_blank'>source here</a>]. 
          <div className='table'>
            <div className='tableRow'>
              <div className='bold thin cell good'>Good</div>
              <div className='thin middleColumn cell good'>{`<`} 12.0 μg/m3</div>
              <div className='cell good'>Air quality is considered satisfactory, and air pollution poses little or no risk.</div>
            </div>
            <div className='tableRow'>
              <div className='bold thin cell moderate'>Moderate</div>
              <div className='thin middleColumn cell moderate'>12.1-35.4 μg/m3</div>
              <div className='cell moderate'>Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.</div>
            </div>
            <div className='tableRow'>
              <div className='bold thin cell unhealthy-sensitive'>Unhealthy for sensitive groups</div>
              <div className='thin middleColumn cell  unhealthy-sensitive'>35.5-55.4 μg/m3</div>
              <div className='cell  unhealthy-sensitive'>Members of sensitive groups may experience health effects. The general public is not likely to be affected.</div>
            </div>
            <div className='tableRow'>
              <div className='bold thin cell unhealthy'>Unhealthy</div>
              <div className='thin middleColumn cell unhealthy'>55.5-150.4 μg/m3</div>
              <div className='cell unhealthy'>Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.</div>
            </div>
            <div className='tableRow'>
              <div className='bold thin cell very-unhealthy'>Very unhealthy</div>
              <div className='thin middleColumn cell very-unhealthy'>150.5-250.4 μg/m3</div>
              <div className='cell very-unhealthy'>Health warnings of emergency conditions. The entire population is more likely to be affected.</div>
            </div>
            <div className='tableRow'>
              <div className='bold thin cell hazardous'>Hazardous</div>
              <div className='thin middleColumn cell hazardous'>> 250.5 μg/m3</div>
              <div className='cell hazardous'>Health alert: everyone may experience more serious health effects.</div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;