import * as React from 'react';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import './css/header.css';

const Header: React.FunctionComponent<{
  title: string,
  subTitle: string,
  url: string,
  fbQuotes: string,
  twitterQuotes: string,
  readingTime: number[],
  editDate: string
}> = (props) => {
  return (
    <div>
      <div className="header">
        <div className='header-wrap'>
          <div className='header-title'>
            <div className='header-span'>
              {props.title}<br /><span className='italics header-subtext'>{props.subTitle}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="share-header">
        <div className='share-top'>
          <span className='footer-start'>Share the <span aria-label="love-emoji" role="img">💖</span></span>
          <div className='icons'>
            <FacebookShareButton url={props.url} quote={props.fbQuotes}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={props.url} title={props.twitterQuotes}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </div>
        </div>
        <div className='last-edits'>Last Edited: {props.editDate} | <span className='reading-time'>Reading time: {props.readingTime[0]} - {props.readingTime[1]} mins </span></div>
      </div>
    </div>
  );
};

export default Header;