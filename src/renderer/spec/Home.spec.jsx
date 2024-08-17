import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import Home from '../pages/Home';

const mockLoadUrl = vi.fn();

vi.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: vi.fn((key, api) => {
      global[key] = api;
    }),
  },
}));

describe('Home 컴포넌트', () => {
  beforeEach(() => {
    global.window.electronAPI = {
      loadUrl: mockLoadUrl,
    };
    mockLoadUrl.mockClear();
  });

  it('URL 입력 필드와 제출 버튼을 표시한다', () => {
    render(<Home />);

    expect(screen.getByPlaceholderText(/Enter URL/i)).toBeInTheDocument();
    expect(screen.getByText(/Go/i)).toBeInTheDocument();
  });

  it('URL 입력 시 입력 필드 값이 업데이트된다', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(/Enter URL/i);

    fireEvent.change(input, { target: { value: 'https://example.com' } });
    expect(input.value).toBe('https://example.com');
  });

  it('유효한 URL 제출 시 loadUrl 함수를 호출한다', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(/Enter URL/i);
    const submitButton = screen.getByText(/Go/i);

    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(submitButton);

    expect(mockLoadUrl).toHaveBeenCalledWith('https://example.com');
  });

  it('유효하지 않은 URL 제출 시 에러 메시지를 표시하고 loadUrl을 호출하지 않는다', async () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(/Enter URL/i);
    const submitButton = screen.getByText(/Go/i);

    fireEvent.change(input, { target: { value: 'invalid-url' } });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText('정확한 주소를 입력해주세요.'),
    ).toBeInTheDocument();

    expect(mockLoadUrl).not.toHaveBeenCalled();
  });
});
