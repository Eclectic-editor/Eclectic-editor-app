import React, { useState, useRef, useLayoutEffect } from 'react';

import './style.scss';

function EditorDropdown({ defaultText, items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultText);
  const [dropdownPosition, setDropdownPosition] = useState({});
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useLayoutEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useLayoutEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      if (window.innerHeight - buttonRect.bottom < dropdownRect.height) {
        setDropdownPosition({ top: 'auto', bottom: '100%' });
      } else {
        setDropdownPosition({ top: '100%', bottom: 'auto' });
      }
    }
  }, [isOpen]);

  return (
    <div className="editor-dropdown" ref={buttonRef}>
      <button
        type="button"
        className={`button-dropdown ${isOpen ? 'is-open' : ''}`}
        onClick={handleButtonClick}
      >
        {selectedItem}
      </button>
      {isOpen && (
        <ul
          className="list-dropdown"
          ref={dropdownRef}
          style={{
            ...dropdownPosition,
          }}
        >
          {items.map((item) => (
            <li key={item} className="item-dropdown">
              <button
                type="button"
                className="item-dropdown-button"
                onClick={() => handleItemClick(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EditorDropdown;
