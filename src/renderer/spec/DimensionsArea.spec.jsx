import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import DimensionsArea from '../pages/Editor/DimensionsArea';
import useStyleStore from '../store/styleStore';

vi.mock('../store/styleStore', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../components/EditorInputWithButtons', () => ({
  default: ({ value, onChange }) => (
    <input
      data-testid="mock-input-with-buttons"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('DimensionsArea 컴포넌트', () => {
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
      width: '100px',
      height: '200px',
      maxWidth: '300px',
      minWidth: '50px',
      maxHeight: '400px',
      minHeight: '100px',
    },
    friendlyIdentifier: 'div',
  };

  it('Dimensions 에디터 영역의 모든 요소를 렌더링한다', () => {
    render(
      <DimensionsArea
        selectedElement={mockSelectedElement}
        onBack={() => {}}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Width' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Height' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Max Width' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Min Width' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Max Height' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Min Height' }),
    ).toBeInTheDocument();

    const inputs = screen.getAllByTestId('mock-input-with-buttons');
    expect(inputs).toHaveLength(6);
  });

  it('초기 값이 올바르게 설정된다', () => {
    render(
      <DimensionsArea
        selectedElement={mockSelectedElement}
        onBack={() => {}}
      />,
    );

    const inputs = screen.getAllByTestId('mock-input-with-buttons');
    expect(inputs[0]).toHaveValue('100px');
    expect(inputs[1]).toHaveValue('200px');
    expect(inputs[2]).toHaveValue('300px');
    expect(inputs[3]).toHaveValue('50px');
    expect(inputs[4]).toHaveValue('400px');
    expect(inputs[5]).toHaveValue('100px');
  });

  it('width 변경 시 handleStyleChange가 호출된다', async () => {
    render(
      <DimensionsArea
        selectedElement={mockSelectedElement}
        onBack={() => {}}
      />,
    );

    const [widthInput] = screen.getAllByTestId('mock-input-with-buttons');
    fireEvent.change(widthInput, { target: { value: '150px' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'dimensions',
        'width',
        '150px',
        'div',
      );

      expect(mockApplyStyle).toHaveBeenCalledWith({
        xPath: '/html/body/div',
        cssText: 'width: 150px',
      });
    });
  });

  it('height 변경 시 handleStyleChange가 호출된다', async () => {
    render(
      <DimensionsArea
        selectedElement={mockSelectedElement}
        onBack={() => {}}
      />,
    );

    const [, heightInput] = screen.getAllByTestId('mock-input-with-buttons');
    fireEvent.change(heightInput, { target: { value: '250px' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'dimensions',
        'height',
        '250px',
        'div',
      );

      expect(mockApplyStyle).toHaveBeenCalledWith({
        xPath: '/html/body/div',
        cssText: 'height: 250px',
      });
    });
  });
});
