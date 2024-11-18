import { useEffect, useState } from 'react';

// ==================================================

/**
 * Retrieves and stores data into the local storage.
 *
 * @param {String} key - The name for an entry in local storage.
 * @param {*} initialValue - The initial value for an entry if there is no
 *   stored value.
 * @returns {[*, Function]} The value and a function to update the value in
 *   the local storage.
 */
function useLocalStorage(key, initialValue) {
  if (typeof key !== 'string' || key === '')
    throw new Error('Key must be a non-empty String.');

  const [value, setValue] = useState(() => {
    let retrievedValue = null;
    try {
      retrievedValue = JSON.parse(window.localStorage.getItem(key));
    } catch (err) {
      console.error(
        `Can not retrieve data from local storage.
        key = %s
        Error =
        %s`,
        key,
        err
      );
    } finally {
      return retrievedValue || initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(
        `Can not store data into local storage:
        key = %s
        value = %s
        Error =
        %s`,
        key,
        value,
        err
      );
    }
  }, [key, value]);

  return [value, setValue];
}

// ==================================================

export { useLocalStorage };
