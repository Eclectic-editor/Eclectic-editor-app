import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import BackgroundArea from '../pages/Editor/BackgroundArea';
import useStyleStore from '../store/styleStore';

vi.mock('../store/styleStore', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../components/EditorColorInput', () => ({
  default: ({ id, label, value, onChange }) => (
    <div data-testid="mock-color-input">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
}));

vi.mock('../components/EditorImageInput', () => ({
  default: ({ id, label, value, onImageChange }) => (
    <div data-testid="mock-image-input">
      <label htmlFor={`${id}-file`}>{label}</label>
      <input
        id={`${id}-file`}
        type="file"
        onChange={(e) => onImageChange(e.target.files[0])}
      />
      <input
        id={`${id}-url`}
        type="text"
        value={value}
        onChange={(e) => onImageChange(e.target.value)}
        aria-label={`${label} URL`}
      />
    </div>
  ),
}));

vi.mock('../components/EditorInput', () => ({
  default: ({ id, label, value, onChange }) => (
    <div data-testid="mock-editor-input">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
}));

vi.mock('../components/EditorDropdown', () => ({
  default: ({ defaultText, items, onSelect }) => (
    <div data-testid="mock-dropdown">
      <button type="button" onClick={() => onSelect(items[0])}>
        {defaultText}
      </button>
    </div>
  ),
}));

describe('BackgroundArea 컴포넌트', () => {
  const mockAddModification = vi.fn();
  const mockApplyStyle = vi.fn();

  beforeEach(() => {
    useStyleStore.mockImplementation((selector) =>
      selector({
        addModification: mockAddModification,
        modifiedElements: {},
      }),
    );

    global.window.electronAPI = {
      applyStyle: mockApplyStyle,
    };
  });

  const mockSelectedElement = {
    xPath: '/html/body/div',
    style: {
      backgroundColor: 'rgb(255, 0, 0)',
      backgroundImage: 'url("test.jpg")',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundOrigin: 'content-box',
      backgroundClip: 'padding-box',
    },
    friendlyIdentifier: 'div',
  };

  it('Background 에디터 영역의 모든 요소를 렌더링한다', () => {
    render(
      <BackgroundArea
        selectedElement={mockSelectedElement}
        onBack={() => {}}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Background Color' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Background Image' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Background Position' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Background Repeat' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Background Attachment' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Background Size' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Background Origin' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Background Clip' }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Background Color')).toBeInTheDocument();
    expect(screen.getByLabelText('Background Image')).toBeInTheDocument();
    expect(screen.getByLabelText('Background Image URL')).toBeInTheDocument();
    expect(screen.getByLabelText('Background Size Custom')).toBeInTheDocument();
  });

  it('배경색 변경 시 handleStyleChange가 호출된다', async () => {
    render(
      <BackgroundArea
        selectedElement={mockSelectedElement}
        onBack={() => {}}
      />,
    );

    const colorInput = screen.getByLabelText('Background Color');
    fireEvent.change(colorInput, { target: { value: 'rgb(0, 255, 0)' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'background',
        'backgroundColor',
        'rgb(0, 255, 0)',
        'div',
      );

      expect(mockApplyStyle).toHaveBeenCalledWith({
        xPath: '/html/body/div',
        cssText: 'background-color: rgb(0, 255, 0)',
      });
    });
  });

  it('배경 크기 변경 시 handleStyleChange가 호출된다', async () => {
    render(
      <BackgroundArea
        selectedElement={mockSelectedElement}
        onBack={() => {}}
      />,
    );

    const sizeInput = screen.getByLabelText('Background Size Custom');
    fireEvent.change(sizeInput, { target: { value: '100% 100%' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'background',
        'backgroundSize',
        '100% 100%',
        'div',
      );

      expect(mockApplyStyle).toHaveBeenCalledWith({
        xPath: '/html/body/div',
        cssText: 'background-size: 100% 100%',
      });
    });
  });

  it('배경 반복 변경 시 handleStyleChange가 호출된다', async () => {
    render(
      <BackgroundArea
        selectedElement={mockSelectedElement}
        onBack={() => {}}
      />,
    );

    const repeatDropdown = screen.getByText('no-repeat');
    fireEvent.click(repeatDropdown);

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'background',
        'backgroundRepeat',
        expect.any(String),
        'div',
      );

      expect(mockApplyStyle).toHaveBeenCalledWith({
        xPath: '/html/body/div',
        cssText: expect.stringContaining('background-repeat:'),
      });
    });
  });
});
