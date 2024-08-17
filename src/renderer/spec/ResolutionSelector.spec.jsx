import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import ResolutionSelector from '../components/ResolutionSelector';

vi.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: vi.fn((key, api) => {
      global[key] = api;
    }),
  },
}));

describe('ResolutionSelector 컴포넌트', () => {
  const mockShowModal = vi.fn();
  const mockEnableMultiViewMode = vi.fn();
  const mockTiltViews = vi.fn();
  const mockSetResolution = vi.fn();

  beforeEach(() => {
    global.window.electronAPI = {
      showModal: mockShowModal,
      enableMultiViewMode: mockEnableMultiViewMode,
      tiltViews: mockTiltViews,
      setResolution: mockSetResolution,
      receive: vi.fn(),
      removeListener: vi.fn(),
    };
  });

  it('설정 버튼 클릭 시 모달을 연다', () => {
    render(<ResolutionSelector />);

    fireEvent.click(screen.getByAltText('setting'));
    expect(mockShowModal).toHaveBeenCalled();
  });

  it('틸트 버튼 클릭 시 뷰를 틸트한다', () => {
    render(<ResolutionSelector />);

    fireEvent.click(screen.getByAltText('tilt'));
    expect(mockTiltViews).toHaveBeenCalled();
  });

  it('해상도 버튼 클릭 시 해당 해상도로 설정한다', () => {
    render(<ResolutionSelector />);

    fireEvent.click(screen.getByAltText('mobile'));
    expect(mockSetResolution).toHaveBeenCalledWith('mobile');
  });

  it('멀티뷰 버튼 클릭 시 멀티뷰 모드를 활성화한다', () => {
    render(<ResolutionSelector />);

    fireEvent.click(screen.getByAltText('Multi-View'));
    expect(mockEnableMultiViewMode).toHaveBeenCalled();
  });

  it('해상도 라벨이 올바르게 업데이트된다', async () => {
    render(<ResolutionSelector />);

    const [[, updateResolutionLabel]] =
      global.window.electronAPI.receive.mock.calls;

    updateResolutionLabel({ desktop: { width: 1380 } });

    await waitFor(() => {
      expect(screen.getByText('Desktop: 1380px')).toBeInTheDocument();
    });
  });

  it('멀티뷰 모드에서는 해상도 라벨이 표시되지 않는다', () => {
    render(<ResolutionSelector />);

    fireEvent.click(screen.getByAltText('Multi-View'));

    expect(screen.queryByText(/Desktop:/)).not.toBeInTheDocument();
  });
});
