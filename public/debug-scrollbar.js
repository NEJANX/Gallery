// Debug script to find elements causing double scrollbar
console.log('Debugging scrollbars...');

// Check all elements that might have overflow
const elements = document.querySelectorAll('*');
const scrollableElements = [];

elements.forEach(el => {
  const computed = window.getComputedStyle(el);
  if (computed.overflowY === 'scroll' || computed.overflowY === 'auto' || computed.overflow === 'scroll' || computed.overflow === 'auto') {
    scrollableElements.push({
      element: el,
      tagName: el.tagName,
      className: el.className,
      overflowY: computed.overflowY,
      overflow: computed.overflow,
      height: computed.height,
      maxHeight: computed.maxHeight
    });
  }
});

console.log('Elements with scrollable overflow:', scrollableElements);

// Check if any element has scrollHeight > clientHeight
const scrollingElements = [];
elements.forEach(el => {
  if (el.scrollHeight > el.clientHeight && el.clientHeight > 0) {
    scrollingElements.push({
      element: el,
      tagName: el.tagName,
      className: el.className,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      diff: el.scrollHeight - el.clientHeight
    });
  }
});

console.log('Elements that are actually scrolling:', scrollingElements);
