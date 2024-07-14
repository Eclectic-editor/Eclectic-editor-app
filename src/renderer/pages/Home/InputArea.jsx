import React, { useState } from 'react';

import Popup from '../../components/Popup';

function InputArea({ url, setUrl, handleSubmit }) {
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const validateUrl = (inputUrl) => {
    try {
      const parsedUrl = new URL(inputUrl);

      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch (err) {
      return false;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateUrl(url)) {
      setError('');
      setShowPopup(false);
      handleSubmit(e);
    } else {
      setError('정확한 주소를 입력해주세요.');
      setShowPopup(true);
    }
  };

  return (
    <div className="area-input">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="input-url"
        />
        <button type="submit" className="button-url">
          Go
        </button>
      </form>
      <Popup show={showPopup} onClose={() => setShowPopup(false)}>
        <p>{error}</p>
      </Popup>
    </div>
  );
}

export default InputArea;
