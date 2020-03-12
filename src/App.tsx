import React, { useState } from 'react';
import ReactGA from 'react-ga';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import Introduction from './Introduction'
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import './declare_modules.d.ts';
import './css/style.css';


ReactGA.initialize('UA-160446912-1');
ReactGA.set({ anonymizeIp: true });
ReactGA.pageview('/');

const App = () => {
  const [ windowWidthValue, setWindowWidthValue ] = useState(window.innerWidth)
  window.onresize = () => {
    setWindowWidthValue(window.innerWidth)
  };
  return (
    <div className="App">
      <Header
        title='Every breath we take!'
        subTitle='Effects of the air pollution on the lives of people in India'
        url='https://air-quality-in-india.netlify.com/'
        fbQuotes='Every breath we take: Effects of the air pollution on the lives of people in India'
        twitterQuotes='Every breath we take: Effects of the air pollution on the lives of people in India https://air-quality-in-india.netlify.com/ via @mustafasaifee42'
        readingTime={[12,15]}
        editDate={'Mar. 2020'}
      />
      <Content 
        contentList={['Introduction','Air Quality in India','Human Cost of Air Pollution','Impact of Air Pollution on Life Expectancy','Economic Cost of Air Pollution','Conclusion']}
        contentID={['Intro','Section1','Section2','Section3','Section4','Section5']}
      />
      <Introduction />
      <Section1 
        windowWidthValue={windowWidthValue}
      />
      <Section2 
        windowWidthValue={windowWidthValue}
      />
      <Section3 
        windowWidthValue={windowWidthValue}
      />
      <Section4 />
      <Section5 />
      <Footer
        url='https://air-quality-in-india.netlify.com/'
        fbQuotes='Every breath we take: Effects of the air pollution on the lives of people in India'
        twitterQuotes='Every breath we take: Effects of the air pollution on the lives of people in India https://air-quality-in-india.netlify.com/ via @mustafasaifee42'
      />
    </div>
  );
}

export default App;
