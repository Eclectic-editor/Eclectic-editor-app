import React from 'react';

import './style.scss';

function SpacingWidget({ padding, margin, paddingOption, marginOption }) {
  const getNumericValue = (value) => parseFloat(value) || 0;

  const paddingClass = `padding-${paddingOption}`;
  const marginClass = `margin-${marginOption}`;

  return (
    <div className={`box-spacing-widget ${paddingClass} ${marginClass}`}>
      <div className="box-padding">
        <div className="top">
          <div className="box-value">
            <span className="value">{getNumericValue(padding.top)}</span>
          </div>
        </div>
        <div className="right">
          <div className="box-value">
            <span className="value">{getNumericValue(padding.right)}</span>
          </div>
        </div>
        <div className="bottom">
          <div className="box-value">
            <span className="value">{getNumericValue(padding.bottom)}</span>
          </div>
        </div>
        <div className="left">
          <div className="box-value">
            <span className="value">{getNumericValue(padding.left)}</span>
          </div>
        </div>
      </div>
      <div className="box-margin">
        <div className="top">
          <div className="box-value">
            <span className="value">{getNumericValue(margin.top)}</span>
          </div>
        </div>
        <div className="right">
          <div className="box-value">
            <span className="value">{getNumericValue(margin.right)}</span>
          </div>
        </div>
        <div className="bottom">
          <div className="box-value">
            <span className="value">{getNumericValue(margin.bottom)}</span>
          </div>
        </div>
        <div className="left">
          <div className="box-value">
            <span className="value">{getNumericValue(margin.left)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpacingWidget;
