// Keep this newer API fallback for browsers supported by Next.js 16.
// The legacy Array, Object, String, Symbol and Promise polyfills are unnecessary.
if (!('canParse' in URL)) {
  URL.canParse = function (url, base) {
    try {
      new URL(url, base);
      return true;
    } catch {
      return false;
    }
  };
}
