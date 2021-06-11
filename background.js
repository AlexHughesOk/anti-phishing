chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.get('deviceID', function(result) {
      if (!result.deviceID) {
          chrome.tabs.create({
              url: "chrome-extension://blimlhmjgcnlihkfblolambkgjkchlnd/html/infoPage.html"
          });
      };
  });
});
