import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Loading from '../components/Loading';

describe('Loading 컴포넌트', () => {
  it('로딩 오버레이와 스피너를 렌더링한다', () => {
    render(<Loading />);

    const loadingOverlay = screen
      .getByText('Loading...')
      .closest('.loading-overlay');
    expect(loadingOverlay).toBeInTheDocument();
    expect(loadingOverlay).toHaveClass('loading-overlay');

    const spinner = loadingOverlay.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('로딩 텍스트를 표시한다', () => {
    render(<Loading />);

    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });
});
