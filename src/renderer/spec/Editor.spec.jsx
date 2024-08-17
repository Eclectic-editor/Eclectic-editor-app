import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Editor from '../pages/Editor';
import useStyleStore from '../store/styleStore';

vi.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: vi.fn((key, api) => {
      global[key] = api;
    }),
  },
}));

vi.mock('../store/styleStore', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../components/EditorColorInput', () => ({
  default: () => <div data-testid="mock-color-input" />,
}));

describe('Editor 컴포넌트', () => {
  const mockGetStylesDocument = vi.fn(() => ({}));
  const mockSaveDocument = vi.fn();
  const mockAddModification = vi.fn();

  beforeEach(() => {
    useStyleStore.mockImplementation((selector) =>
      selector({
        getStylesDocument: mockGetStylesDocument,
        addModification: mockAddModification,
        modifiedElements: {},
      }),
    );

    global.window.electronAPI = {
      saveDocument: mockSaveDocument,
      receive: vi.fn(),
      removeListener: vi.fn(),
      applyStyle: vi.fn(),
    };
  });

  it('에디터 카테고리 버튼들을 렌더링한다', () => {
    render(<Editor />);

    expect(screen.getByText('Font')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Background')).toBeInTheDocument();
    expect(screen.getByText('Dimensions')).toBeInTheDocument();
    expect(screen.getByText('Spacing')).toBeInTheDocument();
    expect(screen.getByText('Border')).toBeInTheDocument();
  });

  it('Font 카테고리 버튼 클릭 시 Font 에디터 영역을 표시한다', () => {
    render(<Editor />);

    fireEvent.click(screen.getByText('Font'));

    expect(screen.getByText('Font Family')).toBeInTheDocument();
    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByText('Font Size')).toBeInTheDocument();
    expect(screen.getByText('Line Height')).toBeInTheDocument();
    expect(screen.getByText('Font Weight')).toBeInTheDocument();
    expect(screen.getByText('Font Style')).toBeInTheDocument();
    expect(screen.getByText('Font Variant')).toBeInTheDocument();
    expect(screen.getByText('Text Decoration')).toBeInTheDocument();
  });

  it('Text 카테고리 버튼 클릭 시 Text 에디터 영역을 표시한다', () => {
    render(<Editor />);

    fireEvent.click(screen.getByText('Text'));

    expect(screen.getByText('Text Align')).toBeInTheDocument();
    expect(screen.getByText('Text Indent')).toBeInTheDocument();
    expect(screen.getByText('Text Transform')).toBeInTheDocument();
    expect(screen.getByText('Word Spacing')).toBeInTheDocument();
    expect(screen.getByText('Letter Spacing')).toBeInTheDocument();
    expect(screen.getByText('Word Wrap')).toBeInTheDocument();
    expect(screen.getByText('White Space')).toBeInTheDocument();
    expect(screen.getByText('Vertical Align')).toBeInTheDocument();
  });

  it('Background 카테고리 버튼 클릭 시 Background 에디터 영역을 표시한다', () => {
    render(<Editor />);

    fireEvent.click(screen.getByText('Background'));

    expect(screen.getByText('Background Color')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Background Image', {
        selector: 'input[type="file"]',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Background Image', {
        selector: 'input[type="text"]',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Background Position' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Background Repeat')).toBeInTheDocument();
    expect(screen.getByText('Background Attachment')).toBeInTheDocument();
    expect(screen.getByText('Background Size')).toBeInTheDocument();
    expect(screen.getByText('Background Origin')).toBeInTheDocument();
    expect(screen.getByText('Background Clip')).toBeInTheDocument();
  });

  it('Dimensions 카테고리 버튼 클릭 시 Dimensions 에디터 영역을 표시한다', () => {
    render(<Editor />);

    fireEvent.click(screen.getByText('Dimensions'));

    expect(screen.getByText('Width')).toBeInTheDocument();
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('Max Width')).toBeInTheDocument();
    expect(screen.getByText('Min Width')).toBeInTheDocument();
    expect(screen.getByText('Max Height')).toBeInTheDocument();
    expect(screen.getByText('Min Height')).toBeInTheDocument();
  });

  it('Spacing 카테고리 버튼 클릭 시 Spacing 에디터 영역을 표시한다', () => {
    render(<Editor />);

    fireEvent.click(screen.getByText('Spacing'));

    expect(screen.getByText('Padding')).toBeInTheDocument();
    expect(screen.getByText('Margin')).toBeInTheDocument();
  });

  it('Border 카테고리 버튼 클릭 시 Border 에디터 영역을 표시한다', () => {
    render(<Editor />);

    fireEvent.click(screen.getByText('Border'));

    expect(screen.getByText('All Border Width')).toBeInTheDocument();
  });

  it('Download 버튼 클릭 시 saveDocument 함수를 호출한다', () => {
    render(<Editor />);

    const downloadButton = screen.getByRole('button', {
      name: /download modified styles/i,
    });

    fireEvent.click(downloadButton);
    expect(mockGetStylesDocument).toHaveBeenCalled();
    expect(mockSaveDocument).toHaveBeenCalled();
  });
});
