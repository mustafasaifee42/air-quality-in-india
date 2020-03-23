import * as React from 'react';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import './css/footer.css';

const Header: React.FunctionComponent<{
  url: string,
  fbQuotes: string,
  twitterQuotes: string,
}> = (props) => {
  return (
    <div className="footer">
      <div className='email'>Please email me at <a href="mailto:saifee.mustafa@gmail.com" target="_blank" rel="noopener noreferrer">saifee.mustafa@gmail.com</a> or connect on <a href="https://twitter.com/mustafasaifee42" target="_blank" rel="noopener noreferrer">twitter</a> for suggestions or queries. For other projects: visit <a href="https://mustafasaifee.com/" target="_blank" rel="noopener noreferrer">www.mustafasaifee.com</a></div>
      <div className='share'>
        <span className='footer-start'>You got all the way down here, consider sharing the <span aria-label="love-emoji" role="img">💖</span></span>
        <div className='icons'>
          <FacebookShareButton url={props.url} quote={props.fbQuotes}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={props.url} title={props.twitterQuotes}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </div>
      </div>
      <div className="footer-content">
        Data sources
        <ul>
          <li>
            <a href="https://www.airvisual.com/" target="_blank" rel="noopener noreferrer">AirVisual</a> by IQAir
          </li>
          <li>  
            <a href="http://berkeleyearth.org/" target="_blank" rel="noopener noreferrer">Berkeley Earth</a>
          </li>
          <li>
            Balakrishnan, K., Dey, S., Gupta, T., Dhaliwal, R. S., Brauer, M., Cohen, A. J., Stanaway, J. D., Beig, G., Joshi, T. K., Aggarwal, A. N., Sabde, Y., Sadhu, H., Frostad, J., Causey, K., Godwin, W., Shukla, D. K., Kumar, G. A., Varghese, C. M., Muraleedharan, P., … Dandona, L. (2019). <a href='https://www.thelancet.com/journals/lanplh/article/PIIS2542-5196(18)30261-4/fulltext' target="_blank" rel="noopener noreferrer">The impact of air pollution on deaths, disease burden, and life expectancy across the states of India: the Global Burden of Disease Study 2017</a>.  The Lancet Planetary Health, 3(1), e26–e39.
          </li>
          <li>
            <a href="https://aqli.epic.uchicago.edu/" target="_blank" rel="noopener noreferrer">The Air Quality Life Index</a> produced by <a href="https://epic.uchicago.edu/" target="_blank" rel="noopener noreferrer">Energy Policy Institute at the University of Chicago (EPIC)</a>
          </li>
          <li>
            Farrow, A., Miller, K.A. {`&`} Myllyvirta, L. <a href="https://www.greenpeace.org/southeastasia/publication/3603/toxic-air-the-price-of-fossil-fuels-full-report/#:~:text=For%20the%20first%20time%2C%20Greenpeace,3.3%25%20of%20the%20world's%20GDP." target="_blank" rel="noopener noreferrer">Toxic Air: The Price of Fossil Fuels</a> Seoul: Greenpeace Southeast Asia. 44 pp. February 2020.
          </li>
        </ul>
        <br />
        <span className="bold">PRIVACY POLICY</span> <br />This website does not save any information about you. We do not directly use cookies or other tracking technologies. We do, however, use Google Analytics for mere statistical reasons. It is possible that Google Analytics sets cookies or uses other tracking technologies, but this data is not directly accessible by us.
        <br />
        <br />
        This page is hosted on <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>
      </div>
    </div>
  );
};

export default Header;