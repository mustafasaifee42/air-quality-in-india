import * as React from 'react';

const Header: React.FunctionComponent<{
  contentList: string[],
  contentID: string[],
}> = (props) => {
  return (
    <div className="container">
      <div className='content-table'>
        <div className='section-title'>
          Content
        </div>
        <div className='content'>
          <ol>
            {props.contentList.map((d:string,i:number) => <li key={i} className='content-list'><a href={`#${props.contentID[i]}`}>{d}</a></li>)}
          </ol>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;