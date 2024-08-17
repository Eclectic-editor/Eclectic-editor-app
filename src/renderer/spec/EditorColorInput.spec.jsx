import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import EditorColorInput from '../components/EditorColorInput';

vi.mock('react-color-palette', () => ({
  ColorPicker: ({ color, onChange }) => (
    <div data-testid="mock-color-picker">
      <input
        type="color"
        value={color.hex}
        onChange={(e) =>
          onChange({ hex: e.target.value, rgb: { r: 0, g: 255, b: 0, a: 1 } })
        }
      />
    </div>
  ),
  useColor: (initialColor) => [
    { hex: initialColor, rgb: { r: 255, g: 0, b: 0, a: 1 } },
    vi.fn(),
  ],
}));

describe('EditorColorInput 컴포넌트', () => {
  it('컴포넌트가 올바르게 렌더링된다', () => {
    render(
      <EditorColorInput
        id="test-color"
        label="테스트 색상"
        value="rgb(255, 0, 0)"
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText('테스트 색상')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('rgb(255, 0, 0)');
  });

  it('입력 필드 클릭 시 컬러 피커가 열린다', () => {
    render(
      <EditorColorInput
        id="test-color"
        label="테스트 색상"
        value="rgb(255, 0, 0)"
        onChange={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));
    expect(screen.getByTestId('mock-color-picker')).toBeInTheDocument();
  });

  it('색상 변경 시 onChange 함수가 호출된다', async () => {
    const mockOnChange = vi.fn();
    render(
      <EditorColorInput
        id="test-color"
        label="테스트 색상"
        value="rgb(255, 0, 0)"
        onChange={mockOnChange}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));
    const colorPicker = screen.getByTestId('mock-color-picker');
    fireEvent.change(colorPicker.querySelector('input'), {
      target: { value: '#00ff00' },
    });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('rgb(0, 255, 0)');
    });
  });

  it('취소 버튼 클릭 시 원래 선택된 색상이 유지된다', async () => {
    const mockOnChange = vi.fn();
    render(
      <EditorColorInput
        id="test-color"
        label="테스트 색상"
        value="rgb(255, 0, 0)"
        onChange={mockOnChange}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));
    const colorPicker = screen.getByTestId('mock-color-picker');
    fireEvent.change(colorPicker.querySelector('input'), {
      target: { value: '#00ff00' },
    });

    fireEvent.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('rgb(255, 0, 0)');
    });
  });
});
