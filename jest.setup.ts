// Global test setup shared by all unit tests.
import '@testing-library/jest-dom';

// jsdom does not implement matchMedia, which some MUI components query.
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// jsdom has no Web Worker; CodeSnippet creates one on mount. Provide a stub so
// any component that reaches it does not crash. (Most tests also mock the
// CodeSnippet module outright.)
class WorkerStub {
  onmessage: ((e: unknown) => void) | null = null;
  postMessage(): void {}
  terminate(): void {}
  addEventListener(): void {}
  removeEventListener(): void {}
}
if (typeof (globalThis as unknown as { Worker?: unknown }).Worker === 'undefined') {
  (globalThis as unknown as { Worker: unknown }).Worker = WorkerStub;
}
