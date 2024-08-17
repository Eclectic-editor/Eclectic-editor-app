import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import SpacingArea from '../pages/Editor/SpacingArea';
import useStyleStore from '../store/styleStore';

vi.mock('../store/styleStore', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('SpacingArea 컴포넌트', () => {
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
  });

  const mockSelectedElement = {
    xPath: '/html/body/div',
    style: {
      paddingTop: '10px',
      paddingRight: '10px',
      paddingBottom: '10px',
      paddingLeft: '10px',
      marginTop: '20px',
      marginRight: '20px',
      marginBottom: '20px',
      marginLeft: '20px',
    },
    friendlyIdentifier: 'div',
  };

  it('SpacingArea 컴포넌트가 올바르게 렌더링된다', () => {
    render(
      <SpacingArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    expect(screen.getByRole('button', { name: 'Spacing' })).toBeInTheDocument();
    expect(screen.getByText('Padding')).toBeInTheDocument();
    expect(screen.getByText('Margin')).toBeInTheDocument();
  });

  it('패딩 옵션을 선택하면 해당 컨트롤이 렌더링된다', () => {
    render(
      <SpacingArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    const paddingSection = screen.getByText('Padding').closest('section');

    fireEvent.click(
      within(paddingSection).getByRole('button', { name: 'All' }),
    );
    expect(screen.getByText('All Padding')).toBeInTheDocument();

    fireEvent.click(
      within(paddingSection).getByRole('button', { name: 'Vertical' }),
    );
    expect(screen.getByText('Vertical Padding')).toBeInTheDocument();

    fireEvent.click(
      within(paddingSection).getByRole('button', { name: 'Horizontal' }),
    );
    expect(screen.getByText('Horizontal Padding')).toBeInTheDocument();

    fireEvent.click(
      within(paddingSection).getByRole('button', { name: 'Individual' }),
    );
    expect(screen.getByText('padding Top')).toBeInTheDocument();
    expect(screen.getByText('padding Right')).toBeInTheDocument();
    expect(screen.getByText('padding Bottom')).toBeInTheDocument();
    expect(screen.getByText('padding Left')).toBeInTheDocument();
  });

  it('마진 옵션을 선택하면 해당 컨트롤이 렌더링된다', () => {
    render(
      <SpacingArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    const marginSection = screen.getByText('Margin').closest('section');

    fireEvent.click(within(marginSection).getByRole('button', { name: 'All' }));
    expect(screen.getByText('All Margin')).toBeInTheDocument();

    fireEvent.click(
      within(marginSection).getByRole('button', { name: 'Vertical' }),
    );
    expect(screen.getByText('Vertical Margin')).toBeInTheDocument();

    fireEvent.click(
      within(marginSection).getByRole('button', { name: 'Horizontal' }),
    );
    expect(screen.getByText('Horizontal Margin')).toBeInTheDocument();

    fireEvent.click(
      within(marginSection).getByRole('button', { name: 'Individual' }),
    );
    expect(screen.getByText('margin Top')).toBeInTheDocument();
    expect(screen.getByText('margin Right')).toBeInTheDocument();
    expect(screen.getByText('margin Bottom')).toBeInTheDocument();
    expect(screen.getByText('margin Left')).toBeInTheDocument();
  });

  it('패딩 값을 변경하면 addModification과 applyStyle이 호출된다', async () => {
    render(
      <SpacingArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    const [paddingInput] = screen.getAllByDisplayValue('10px');
    fireEvent.change(paddingInput, { target: { value: '20px' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'spacing',
        'paddingTop',
        '20px',
        'div',
      );

      expect(mockApplyStyle).toHaveBeenCalledWith({
        xPath: '/html/body/div',
        cssText: 'padding-top: 20px',
      });
    });
  });

  it('마진 값을 변경하면 addModification과 applyStyle이 호출된다', async () => {
    render(
      <SpacingArea selectedElement={mockSelectedElement} onBack={() => {}} />,
    );

    const [marginInput] = screen.getAllByDisplayValue('20px');
    fireEvent.change(marginInput, { target: { value: '30px' } });

    await waitFor(() => {
      expect(mockAddModification).toHaveBeenCalledWith(
        '/html/body/div',
        'spacing',
        'marginTop',
        '30px',
        'div',
      );

      expect(mockApplyStyle).toHaveBeenCalledWith({
        xPath: '/html/body/div',
        cssText: 'margin-top: 30px',
      });
    });
  });
});
