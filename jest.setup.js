// Setup file for Jest tests

// Ensure global timers are available before the testing library loads
if (typeof global.setTimeout === 'undefined') {
  global.setTimeout = setTimeout;
  global.clearTimeout = clearTimeout;
  global.setInterval = setInterval;
  global.clearInterval = clearInterval;
}

// Silence the warning: Animated: `useNativeDriver` is not supported
global.window = global.window || {};
global.window.__reanimatedWorkletInit = jest.fn();
