import 'jest-preset-angular';
global['CSS'] = null;
import * as Storage from 'dom-storage';

/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
    value: (): Object => {
        return {
            enumerable: true,
            configurable: true
        };
    }
});

const mock = (): Object => {
  let storage = {};

  return {
    getItem: (key): any => (key in storage ? storage[key] : null),
    setItem: (key, value): any => (storage[key] = value || ''),
    removeItem: (key): any => delete storage[key],
    clear: (): Object => (storage = {})
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: (): Array<string> => ['-webkit-appearance']
});
Object.defineProperty(window, 'getComputedStyle', {
  value: (): any => ({
    getPropertyValue: (prop): string => {
      return '';
    }
  })
});
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => {
    return { matches: true };
  })
});
