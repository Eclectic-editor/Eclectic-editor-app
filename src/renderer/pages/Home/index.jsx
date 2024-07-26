import React, { useState } from 'react';

import IntroArea from './IntroArea';
import LogoArea from './LogoArea';
import InputArea from './InputArea';

import './style.scss';

function Home() {
  const [url, setUrl] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.electronAPI.loadUrl(url);
    setIsHidden(true);
  };

  return (
    <section className={`page-intro ${isHidden ? 'is-hide' : ''}`}>
      {isHidden ? null : (
        <>
          <IntroArea />
          <LogoArea />
          <InputArea url={url} setUrl={setUrl} handleSubmit={handleSubmit} />
        </>
      )}
    </section>
  );
}

export default Home;
