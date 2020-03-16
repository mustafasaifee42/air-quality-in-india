import React from 'react';

const Header: React.FunctionComponent<{}> = () => {
  return (
    <div>
      <div className="container section" id='Section4'>
        <div className='section-title'>
            Economic Cost of Air Pollution
        </div>
        <div className='content'>
          Apart from the adverse health effects, air pollution also hampers economic development. Air pollution causes a lot of premature deaths, increases the incidence of chronic and acute illnesses and contributes to millions of hospital visits and billions of work absences due to illness each year, and all of these come at huge economic costs. 
          <br />
          <br />
          A recent study by Greenpeace Southeast Asia and Center for Research on Energy and Clean Air, <a href="https://www.greenpeace.org/southeastasia/publication/3603/toxic-air-the-price-of-fossil-fuels-full-report/#:~:text=For%20the%20first%20time%2C%20Greenpeace,3.3%25%20of%20the%20world's%20GDP." rel="noopener noreferrer" target="_blank">Toxic air: The price of fossil fuels</a>, tries to analyse the economic cost of air pollution caused by the burning of fossil fuels. According to the report, India bears one of the highest economic cost of soaring pollution at an estimated <span className="bold">INR 10.7 lakh crore ($150 billion)</span> a year. Air pollution cost <span className='bold'>~ INR 7991 per capita</span> annually.
          <div className='quote red'>Air pollution costs India <span className="bold">5.4%</span> of its GDP annually</div>
          The report also states that exposure to pollution from fossil fuels lead to around <span className="bold">49 crore days of work absence</span>.
          <div className='quote red'>Each person in labour force in India takes approx. 1 day of work absence on average because of the illness caused by air pollution</div>
          In a country where around 94% of labour force is in unorganized sector and lives on daily wages, 1 day of work absence can cause a lot of financial distress.
          <br />
          <br/>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Header;