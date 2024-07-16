import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IntroArea from './IntroArea';
import LogoArea from './LogoArea';
import InputArea from './InputArea';

import './style.scss';

function Home() {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    window.electronAPI.loadUrl(url);
    navigate('/app', { state: { url } });
  };

  return (
    <section className="page-intro">
      <IntroArea />
      <LogoArea />
      <InputArea url={url} setUrl={setUrl} handleSubmit={handleSubmit} />
    </section>
  );
}

export default Home;
