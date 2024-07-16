import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import ResolutionSelector from './components/ResolutionSelector';

function App() {
  const location = useLocation();
  const { url } = location.state;

  useEffect(() => {
    window.electronAPI.loadUrl(url);
  }, [url]);

  return <ResolutionSelector />;
}

export default App;
