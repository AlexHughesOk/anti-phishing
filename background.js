chrome.runtime.onInstalled.addListener(function(object) {
  chrome.storage.local.get('deviceID', function(result) {
      if (!result.deviceID) {
          const current = new Date();
          current.setMonth(current.getMonth() - 1);
          const cookieValue = current.toLocaleString('default', {
              month: 'long'
          });
          chrome.storage.local.set({
              "metricsShown": cookieValue
          });

          chrome.tabs.create({
              url: "chrome-extension://blimlhmjgcnlihkfblolambkgjkchlnd/html/infoPage.html"
          });
      };
  });
});

chrome.runtime.setUninstallURL("https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR_640kaCI-9eTSPsfKbP1SXJTWD4CrZRo8U7MvNJ9VWGi0vRTVbcjP3EVpoGyPceLgBWGj9KFwYH7q2wFhDBnBHzmL3VYr4iljG1E0n0ikVLPt8GAEn8cjE9ctTu-A&usqp=CAE", function(object) {});