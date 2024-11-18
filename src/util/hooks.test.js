import { act, renderHook } from '@testing-library/react';

import { useLocalStorage } from './hooks';

// ==================================================

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns initial value if there is no stored value.', () => {
    // Arrange
    const keyName = 'colors';
    const initialValue = Object.freeze({ black: '#000000' });

    // Act
    const { result } = renderHook(() => useLocalStorage(keyName, initialValue));

    // Assert
    expect(result.current[0]).toEqual(initialValue);
  });

  it('stores new value into local storage.', () => {
    // Arrange
    const keyName = 'colors';
    const initialValue = Object.freeze({});
    const newValue = Object.freeze({ white: '#ffffff' });

    const { result } = renderHook(() => useLocalStorage(keyName, initialValue));
    const setValue = result.current[1];

    // Act
    act(() => setValue(newValue));

    // Assert
    const value = result.current[0];
    expect(value).toEqual(newValue);

    const storedValue = JSON.parse(window.localStorage.getItem(keyName));
    expect(storedValue).toEqual(newValue);
  });

  it('returns stored value from local storage.', () => {
    // Arrange
    const keyName = 'colors';
    const initialValue = Object.freeze({});
    const newValue = Object.freeze({ white: '#ffffff' });

    let { result, unmount } = renderHook(() =>
      useLocalStorage(keyName, initialValue)
    );
    const setValue = result.current[1];

    act(() => setValue(newValue));

    // Shutting down current instance of hook.
    unmount();

    // Act
    // Starting new instance/render....
    ({ result } = renderHook(() => useLocalStorage(keyName, initialValue)));
    const value = result.current[0];

    // Assert
    expect(value).toEqual(newValue);
  });

  it.each([[''], [[]], [{}], [null], [undefined], [1]])(
    'only allows keys to be non-empty Strings.',
    (keyName) => {
      // Arrange
      const initialValue = Object.freeze({ black: '#000000' });

      // Act / Assert
      expect(() => useLocalStorage(keyName, initialValue)).toThrow();
    }
  );
});
