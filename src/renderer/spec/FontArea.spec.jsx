import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import FontArea from '../pages/Editor/FontArea';
import useStyleStore from '../store/styleStore';

vi.mock('../store/styleStore', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../components/EditorDropdown', () => ({
  default: ({ defaultText, items, onSelect }) => (
    <select
      data-testid="mock-dropdown"
      value={defaultText}
      onChange={(e) => onSelect(e.target.value)}
    >
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  ),
}));

vi.mock('../components/EditorColorInput', () => ({
  default: ({ id, label, value, onChange }) => (
    <input
      data-testid="mock-color-input"
      id={id}
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

vi.mock('../components/EditorInputGroup', () => ({
  default: ({ value, onChange }) => (
    <input
      data-testid="mock-input-group"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('FontArea 컴포넌트', () => {
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

    vi.clearAllMocks();
  });

  const mockSelectedElement = {
    xPath: '/html/body/div',
    style: {
      fontFamily: 'Arial',
      color: 'rgb(255, 255, 255)',
      fontSize: '17px',
      lineHeight: '24px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontVariant: 'normal',
      textDecorationLine: 'none',
    },
    friendlyIdentifier: 'div',
  };

  it('Font 에디터 영역의 모든 요소를 렌더링한다', () => {
    render(
      <FontArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    expect(
      screen.getByRole('heading', { name: 'Font Family' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Color' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Font Size' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Line Height' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Font Weight' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Font Style' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Font Variant' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Text Decoration' }),
    ).toBeInTheDocument();

    expect(screen.getAllByTestId('mock-dropdown')).toHaveLength(5);
    expect(screen.getByTestId('mock-color-input')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-input-group')).toHaveLength(2);
  });

  it('초기 값이 올바르게 설정된다', () => {
    render(
      <FontArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    const dropdowns = screen.getAllByTestId('mock-dropdown');
    expect(dropdowns[0]).toHaveValue('Arial');
    expect(dropdowns[1]).toHaveValue('normal');
    expect(dropdowns[2]).toHaveValue('normal');
    expect(dropdowns[3]).toHaveValue('normal');
    expect(dropdowns[4]).toHaveValue('none');

    expect(screen.getByTestId('mock-color-input')).toHaveValue(
      'rgb(255, 255, 255)',
    );

    const inputs = screen.getAllByTestId('mock-input-group');
    expect(inputs[0]).toHaveValue('17px');
    expect(inputs[1]).toHaveValue('24px');
  });

  it('color 변경 시 handleStyleChange가 호출된다', async () => {
    render(
      <FontArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    const colorInput = screen.getByTestId('mock-color-input');
    fireEvent.change(colorInput, { target: { value: 'rgb(0, 0, 0)' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'font',
        'color',
        'rgb(0, 0, 0)',
        'div',
      );

      expect(mockApplyStyle).toHaveBeenCalledWith({
        xPath: '/html/body/div',
        cssText: 'color: rgb(0, 0, 0)',
      });
    });
  });

  it('font-size 변경 시 handleStyleChange가 호출된다', async () => {
    render(
      <FontArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    const [fontSizeInput] = screen.getAllByTestId('mock-input-group');
    fireEvent.change(fontSizeInput, { target: { value: '20px' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'font',
        'fontSize',
        '20px',
        'div',
      );

      expect(mockApplyStyle).toHaveBeenCalledWith({
        xPath: '/html/body/div',
        cssText: 'font-size: 20px',
      });
    });
  });
});
