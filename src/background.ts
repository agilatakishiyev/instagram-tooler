chrome.runtime.onInstalled.addListener(async () => {
  console.log("Extension installed");
});

function iconDetection(active: boolean) {
  if (active) {
    chrome.action.setIcon({
      path: "icon-enabled.png",
    });
  } else {
    chrome.action.setIcon({
      path: "icon-disabled.png",
    });
  }
}
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  let url = new URL(tab.url ?? "");
  iconDetection(url.hostname.includes("instagram.com"));
});
chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let url = new URL(tabs[0].url ?? "");
    iconDetection(url.hostname.includes("instagram.com"));
  });
});
