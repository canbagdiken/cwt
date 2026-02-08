// Background service worker for CWT
chrome.runtime.onInstalled.addListener(() => {
  console.log('CWT: Extension installed');
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openPopup') {
    chrome.action.openPopup();
  }
});
