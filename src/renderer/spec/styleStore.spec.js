import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import useStyleStore from '../store/styleStore';

describe('StyleStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useStyleStore());
    act(() => {
      result.current.resetModifications();
    });
  });

  it('초기 상태가 비어 있다', () => {
    const { result } = renderHook(() => useStyleStore());
    expect(result.current.modifiedElements).toEqual({});
  });

  it('addModification이 올바르게 동작한다', () => {
    const { result } = renderHook(() => useStyleStore());

    act(() => {
      result.current.addModification(
        '/html/body/div',
        'border',
        'borderWidth',
        '1px',
        'div',
      );
    });

    expect(result.current.modifiedElements).toEqual({
      '/html/body/div': {
        border: { borderWidth: '1px' },
        friendlyIdentifier: 'div',
      },
    });
  });

  it('isGroup이 true일 때 addModification이 올바르게 동작한다', () => {
    const { result } = renderHook(() => useStyleStore());

    act(() => {
      result.current.addModification(
        '/html/body/div',
        'border',
        'borderWidth',
        { top: '1px', right: '1px', bottom: '1px', left: '1px' },
        'div',
        true,
      );
    });

    expect(result.current.modifiedElements).toEqual({
      '/html/body/div': {
        border: {
          top: '1px',
          right: '1px',
          bottom: '1px',
          left: '1px',
          groupProperties: { borderWidth: true },
        },
        friendlyIdentifier: 'div',
      },
    });
  });

  it('resetModifications이 상태를 초기화한다', () => {
    const { result } = renderHook(() => useStyleStore());

    act(() => {
      result.current.addModification(
        '/html/body/div',
        'border',
        'borderWidth',
        '1px',
        'div',
      );

      result.current.resetModifications();
    });

    expect(result.current.modifiedElements).toEqual({});
  });

  it('getStylesDocument이 올바른 형식으로 문서를 반환한다', () => {
    const { result } = renderHook(() => useStyleStore());

    act(() => {
      result.current.addModification(
        '/html/body/div',
        'border',
        'borderWidth',
        '1px',
        'div',
      );

      result.current.addModification(
        '/html/body/div',
        'color',
        'color',
        'red',
        'div',
      );
    });

    const document = result.current.getStylesDocument();

    expect(document).toEqual({
      '/html/body/div': {
        friendlyIdentifier: 'div',
        styles: {
          borderWidth: '1px',
          color: 'red',
        },
      },
    });
  });
});
