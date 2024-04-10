// useHotkey.ts

import { useEffect } from 'react';

type TCallback = (e: KeyboardEvent) => void;

const useHotkey = (key: string, callback: TCallback) => {
  useEffect(() => {
    const handleHotkey = (e: KeyboardEvent) => {
      if (e.key === key) {
        callback(e);
      }
    };

    window.addEventListener('keydown', handleHotkey);

    return () => {
      window.removeEventListener('keydown', handleHotkey);
    };
  }, [key, callback]);
};

export default useHotkey;