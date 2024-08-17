import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import BorderArea from '../pages/Editor/BorderArea';
import useStyleStore from '../store/styleStore';

vi.mock('../store/styleStore', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../components/EditorColorInput', () => ({
  default: ({ value, onChange }) => (
    <input
      data-testid="mock-color-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('BorderArea 컴포넌트', () => {
  const mockAddModification = vi.fn();
  const mockApplyStyle = vi.fn();

  beforeEach(() => {
    const mockStore = {
      addModification: mockAddModification,
      modifiedElements: {},
    };
    useStyleStore.mockImplementation((selector) => selector(mockStore));

    global.window.electronAPI = {
      applyStyle: mockApplyStyle,
    };

    vi.clearAllMocks();
  });

  const mockSelectedElement = {
    xPath: '/html/body/div',
    style: {
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderTopColor: 'rgb(0, 0, 0)',
      borderRightColor: 'rgb(0, 0, 0)',
      borderBottomColor: 'rgb(0, 0, 0)',
      borderLeftColor: 'rgb(0, 0, 0)',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
      borderBottomLeftRadius: '0px',
    },
    friendlyIdentifier: 'div',
  };

  it('BorderArea 컴포넌트가 올바르게 렌더링된다', () => {
    render(
      <BorderArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    expect(screen.getByRole('button', { name: 'Border' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Border' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Top' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Right' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bottom' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Left' })).toBeInTheDocument();
  });

  it('All Border 옵션을 선택하면 AllBorderControl이 렌더링된다', () => {
    render(
      <BorderArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('All Border Width')).toBeInTheDocument();
    expect(screen.getByText('All Border Color')).toBeInTheDocument();
    expect(screen.getByText('All Border Style')).toBeInTheDocument();
    expect(screen.getByText('All Border Radius')).toBeInTheDocument();
  });

  it('Top Border 옵션을 선택하면 BorderControl이 렌더링된다', () => {
    render(
      <BorderArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Top' }));
    expect(screen.getByText('Border Top Width')).toBeInTheDocument();
    expect(screen.getByText('Border Top Color')).toBeInTheDocument();
    expect(screen.getByText('Border Top Style')).toBeInTheDocument();
    expect(screen.getByText('Border Top Radius')).toBeInTheDocument();
  });

  it('Border 값을 변경하면 addModification과 applyStyle이 호출된다', async () => {
    render(
      <BorderArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    const widthInput = screen.getByDisplayValue('1px');
    fireEvent.change(widthInput, { target: { value: '2px' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'border',
        'borderWidth',
        expect.objectContaining({
          borderTopWidth: '2px',
          borderRightWidth: '2px',
          borderBottomWidth: '2px',
          borderLeftWidth: '2px',
        }),
        'div',
        true,
      );

      expect(mockApplyStyle).toHaveBeenCalledTimes(4);
    });
  });

  it('Border 색상을 변경하면 addModification과 applyStyle이 호출된다', async () => {
    render(
      <BorderArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    const colorInput = screen.getByTestId('mock-color-input');
    fireEvent.change(colorInput, { target: { value: 'rgb(255, 0, 0)' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'border',
        'borderColor',
        expect.objectContaining({
          borderTopColor: 'rgb(255, 0, 0)',
          borderRightColor: 'rgb(255, 0, 0)',
          borderBottomColor: 'rgb(255, 0, 0)',
          borderLeftColor: 'rgb(255, 0, 0)',
        }),
        'div',
        true,
      );

      expect(mockApplyStyle).toHaveBeenCalledTimes(4);
    });
  });

  it('Border 스타일을 변경하면 addModification과 applyStyle이 호출된다', async () => {
    render(
      <BorderArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    const styleButton = screen.getByRole('button', { name: 'solid' });
    fireEvent.click(styleButton);

    const dashedOption = screen.getByRole('button', { name: 'dashed' });
    fireEvent.click(dashedOption);

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'border',
        'borderStyle',
        expect.objectContaining({
          borderTopStyle: 'dashed',
          borderRightStyle: 'dashed',
          borderBottomStyle: 'dashed',
          borderLeftStyle: 'dashed',
        }),
        'div',
        true,
      );

      expect(mockApplyStyle).toHaveBeenCalledTimes(4);
    });
  });

  it('Border 반경을 변경하면 addModification과 applyStyle이 호출된다', async () => {
    render(
      <BorderArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    const radiusInput = screen.getByDisplayValue('0px');
    fireEvent.change(radiusInput, { target: { value: '5px' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'border',
        'borderRadius',
        expect.objectContaining({
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
          borderBottomRightRadius: '5px',
          borderBottomLeftRadius: '5px',
        }),
        'div',
        true,
      );

      expect(mockApplyStyle).toHaveBeenCalledTimes(4);
    });
  });
});
