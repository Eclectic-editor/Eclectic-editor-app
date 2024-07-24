import React, { useState, useEffect } from 'react';

import EditorInput from '../EditorInput';

import './style.scss';

function EditorImageInput({ id, label, value, onImageChange }) {
  const [inputValue, setInputValue] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (value && value.startsWith('data:')) {
      setInputValue(fileName);
    } else {
      setInputValue(value || '');
    }
  }, [value, fileName]);

  const handleFileChange = (e) => {
    const [file] = e.target.files;

    if (file) {
      setFileName(file.name);
      const reader = new FileReader();

      reader.onloadend = () => {
        const { result } = reader;
        onImageChange(result);
        setInputValue(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue);

    if (newValue === '') {
      setFileName('');
      onImageChange(null);
    } else if (!newValue.startsWith('data:')) {
      setFileName('');
      onImageChange(newValue);
    }
  };

  return (
    <div className="editor-image-input">
      <label htmlFor={`${id}-file`} className="blind">
        {label}
      </label>
      <div className="input-file-box">
        <input
          type="file"
          id={`${id}-file`}
          className="image-file-input"
          onChange={handleFileChange}
          accept="image/*"
        />
        <label htmlFor={`${id}-file`} className="file-name">
          Select a File
        </label>
      </div>
      <strong className="box-file-title">Image Source</strong>
      <EditorInput
        id={`${id}-url`}
        label="Background Image"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter image URL or select a file"
      />
    </div>
  );
}

export default EditorImageInput;
