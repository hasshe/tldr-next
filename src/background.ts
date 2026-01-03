// src/background.ts
chrome.runtime.onInstalled.addListener(() => {
  console.log("TL;DR Next extension installed!");
});

// Example: Listen for messages from your React App
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === "GREETING") {
    sendResponse({ message: "Hello from the background!" });
  }
});

export {}