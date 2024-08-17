import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import TextArea from '../pages/Editor/TextArea';
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

vi.mock('../components/EditorInputGroup', () => ({
  default: ({ value, onChange }) => (
    <input
      data-testid="mock-input-group"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('TextArea 컴포넌트', () => {
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
      textAlign: 'left',
      textIndent: '0px',
      textTransform: 'none',
      wordSpacing: 'normal',
      letterSpacing: 'normal',
      wordWrap: 'normal',
      whiteSpace: 'normal',
      verticalAlign: 'baseline',
    },
    friendlyIdentifier: 'div',
  };

  it('Text 에디터 영역의 모든 요소를 렌더링한다', () => {
    render(
      <TextArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    expect(
      screen.getByRole('heading', { name: 'Text Align' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Text Indent' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Text Transform' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Word Spacing' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Letter Spacing' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Word Wrap' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'White Space' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Vertical Align' }),
    ).toBeInTheDocument();

    expect(screen.getAllByTestId('mock-dropdown')).toHaveLength(5);
    expect(screen.getAllByTestId('mock-input-group')).toHaveLength(3);
  });

  it('초기 값이 올바르게 설정된다', () => {
    render(
      <TextArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    const dropdowns = screen.getAllByTestId('mock-dropdown');
    expect(dropdowns[0]).toHaveValue('left');
    expect(dropdowns[1]).toHaveValue('none');
    expect(dropdowns[2]).toHaveValue('normal');
    expect(dropdowns[3]).toHaveValue('normal');
    expect(dropdowns[4]).toHaveValue('baseline');

    const inputs = screen.getAllByTestId('mock-input-group');
    expect(inputs[0]).toHaveValue('0px');
    expect(inputs[1]).toHaveValue('normal');
    expect(inputs[2]).toHaveValue('normal');
  });

  it('text-align 변경 시 handleStyleChange가 호출된다', async () => {
    render(
      <TextArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    const [textAlignDropdown] = screen.getAllByTestId('mock-dropdown');
    fireEvent.change(textAlignDropdown, { target: { value: 'center' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'text',
        'textAlign',
        'center',
        'div',
      );

      expect(mockApplyStyle).toHaveBeenCalledWith({
        xPath: '/html/body/div',
        cssText: 'text-align: center',
      });
    });
  });

  it('text-indent 변경 시 handleStyleChange가 호출된다', async () => {
    render(
      <TextArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    const [textIndentInput] = screen.getAllByTestId('mock-input-group');
    fireEvent.change(textIndentInput, { target: { value: '20px' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'text',
        'textIndent',
        '20px',
        'div',
      );

      expect(mockApplyStyle).toHaveBeenCalledWith({
        xPath: '/html/body/div',
        cssText: 'text-indent: 20px',
      });
    });
  });
});
