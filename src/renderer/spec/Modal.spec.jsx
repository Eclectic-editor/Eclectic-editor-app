import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Modal from '../components/Modal';

vi.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: vi.fn((key, api) => {
      global[key] = api;
    }),
  },
}));

describe('Modal 컴포넌트', () => {
  const mockUpdateResolutions = vi.fn();
  const mockCloseModal = vi.fn();

  beforeEach(() => {
    global.window.electronAPI = {
      receive: vi.fn((channel, callback) => {
        if (channel === 'currentResolutions') {
          callback({
            mobile: { width: 375, height: 812 },
            tablet: { width: 768, height: 1024 },
            desktop: { width: 1380, height: 900 },
          });
        }
      }),
      removeListener: vi.fn(),
      updateResolutions: mockUpdateResolutions,
      closeModal: mockCloseModal,
    };
  });

  it('모달이 올바르게 렌더링된다', () => {
    render(<Modal />);

    expect(screen.getByText('Resolution Settings')).toBeInTheDocument();
    expect(screen.getByText('Desktop')).toBeInTheDocument();
    expect(screen.getByText('Tablet')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
  });

  it('초기 해상도 값이 올바르게 설정된다', () => {
    render(<Modal />);

    expect(
      screen.getByLabelText('Width', { selector: '#desktop-width' }),
    ).toHaveValue('1380');
    expect(
      screen.getByLabelText('Height', { selector: '#desktop-height' }),
    ).toHaveValue('900');
    expect(
      screen.getByLabelText('Width', { selector: '#tablet-width' }),
    ).toHaveValue('768');
    expect(
      screen.getByLabelText('Height', { selector: '#tablet-height' }),
    ).toHaveValue('1024');
    expect(
      screen.getByLabelText('Width', { selector: '#mobile-width' }),
    ).toHaveValue('375');
    expect(
      screen.getByLabelText('Height', { selector: '#mobile-height' }),
    ).toHaveValue('812');
  });

  it('해상도 값을 변경할 수 있다', () => {
    render(<Modal />);

    const desktopWidthInput = screen.getByLabelText('Width', {
      selector: '#desktop-width',
    });

    fireEvent.change(desktopWidthInput, { target: { value: '1440' } });
    expect(desktopWidthInput).toHaveValue('1440');
  });

  it('유효하지 않은 해상도 값을 입력하면 에러 메시지를 표시한다', async () => {
    render(<Modal />);

    const desktopWidthInput = screen.getByLabelText('Width', {
      selector: '#desktop-width',
    });

    fireEvent.change(desktopWidthInput, { target: { value: '100' } });
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(
        screen.getByText('너비는 1025px에서 3840px 사이여야 합니다.'),
      ).toBeInTheDocument();
    });
  });

  it('유효한 해상도 값을 저장하고 모달을 닫는다', async () => {
    render(<Modal />);

    const desktopWidthInput = screen.getByLabelText('Width', {
      selector: '#desktop-width',
    });

    fireEvent.change(desktopWidthInput, { target: { value: '1440' } });
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockUpdateResolutions).toHaveBeenCalledWith(
        expect.objectContaining({
          desktop: expect.objectContaining({ width: 1440 }),
        }),
      );

      expect(mockCloseModal).toHaveBeenCalled();
    });
  });

  it('Close 버튼을 클릭하면 모달을 닫는다', () => {
    render(<Modal />);

    fireEvent.click(screen.getByText('Close'));
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
