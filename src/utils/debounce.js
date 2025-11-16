export function debounce(func, delay) {
  let timeoutId = null;

  return function (...args) {
    const context = this;

    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(context, args);
      timeoutId = null; // Optional: reset after execution
    }, delay);
  };
}
