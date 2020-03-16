import * as React from 'react';
import Donut from './Donut';
import ColumnChart from './ColumnChart';
import ColumnChartDeathRate from './ColumnChartDeathRate';
import DeathByCauses from './data/deathByCauses.json';
import DeathRateByAge from './data/deathRateByAge.json';
import './css/particle.css'

const Header: React.FunctionComponent<{windowWidthValue:number}>  = (props) => {
  let chart1Width = 900, chart2Width = 680, chart1padding = 40, rotation = 0;

  if(props.windowWidthValue < 730) {
    chart2Width = props.windowWidthValue - 80;
  }
  if(props.windowWidthValue < 960) {
    chart1Width = props.windowWidthValue - 80;
    chart1padding = 10;
    rotation = 90
  }

  return (
    <div>
      <div className="container section" id='Section2'>
        <div className='section-title'>
          Human Cost of Air Pollution
        </div>
        <div className='content'>
          According to the World Health Organization, air pollution is amongst the top threats to global health. According to the <a href='https://www.thelancet.com/action/showPdf?pii=S2542-5196%2818%2930261-4' rel="noopener noreferrer" target="_blank">Global Burden of Diseases, Injuries, and Risk Factors Study (GBD) 2017</a>, air pollution was responsible for an estimated <span className="bold">1.24 million (12.5% of total)</span> deaths in India in 2017.
          <div className='quote red'>In 2017, an estimated <span className='bold'>1 in 8 (12.5%)</span> deaths in India were caused by air pollution.</div>
          According to the study, India leads the world in number of premature deaths caused by air pollution. India has 18% of the global population, but <span className="bold">25.3% of premature mortality and health loss caused by air pollution globally</span> were in India.
          <div className='quote red'>In 2017, about <span className='bold'>1 in 4 (25.3%)</span>  premature deaths caused by air pollution in the world were in India.</div>
          <Donut
            width = {props.windowWidthValue >= 720 ? 720 : props.windowWidthValue - 40}
            height = {props.windowWidthValue >= 720 ? 400 : 490}
            keyPos={props.windowWidthValue >= 720 ? [425,300] : [30,420]}
            radius={props.windowWidthValue >= 380 ? 200 : props.windowWidthValue / 2}
            value={[1240530,3654946]}
            total={4895476}
            color={['#e03e3e','#bbb']}
            keyValue={['India','Rest of World']}
          />
          According to Global Burden of Diseases, Injuries, and Risk Factors Study 2017 [<a href="https://vizhub.healthdata.org/gbd-compare/" rel="noopener noreferrer" target="_blank">source here</a>], air pollution was one of the major causes of death and disability in the India. <span className="bold">Air pollution cause more death than tobacco smoking, alcohol use, high blood sugar, obesity, high cholesterol or road accidents.</span>
        </div>
      </div>
      <ColumnChart
        width={chart1Width}
        height={500}
        padding = {chart1padding}
        range = {[0,1850000]}
        data={DeathByCauses}
        rotation={rotation}
        
      />
      <div className="container">
        <div className="quote red"><span className="bold">51.4%</span> of the deaths attributable to air pollution in India in 2017 were in people younger than 70 years.</div>
        <div className='quote red'>In India about <span className="bold">1 in 9 (10.8%)</span> deaths in people younger than 70 years and about <span className="bold">1 in 7 (15.1%)</span> deaths in people older than 70 years was caused by air pollution</div>
        The death rate for air pollution is high for sensitive age groups i.e. younger than 5 yrs and older than 70 yrs. Air pollution is the 2nd biggest cause of death for people between 6 to 14yrs and 3rd biggest cause of death in people younger the 5 yrs and older than 70 yrs.
        <br />
        <br />
        <ColumnChartDeathRate
          width={chart2Width}
          height={350}
          padding = {40}
          range = {[0,1450]}
          data={DeathRateByAge}
        />
        <br />
        <br />
        <hr />
      </div>
    </div>
  );
};

export default Header;