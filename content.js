var hosts = [];

var intervalId = -1;

//Removes Alert if clicked
document.addEventListener('click', WindowClick);
function WindowClick() {

  RemoveAlert();
  clearInterval(intervalId);
  setTimeout(chk1, 1000);
}


for (i = 0; i < top.document.links.length; i++) {
    var host = top.document.links[i].hostname;
      host = host.toLowerCase();

      if (host.search(/safelinks\.protection\.outlook\.com/i) >= 0) {

          host = top.document.links[i].href.replace(/https:\/\/\w*\.?safelinks\.protection\.outlook\.com\/\?url=/gmi, "");
          host = decodeURIComponent(host);
          host = host.replace(/^https?:\/\//gmi, "");
          host = host.replace(/^www\./gmi, "");
          host = host.replace(/[\?\&\/].*/gmi, "");
      }

    host = host.replace(/^www\./gmi, "");

    if (hosts.indexOf(host) == -1 && host.match(/\.[a-z]*$/)) {
      hosts.push(host);
    }
  }



  
  //console.log(top.document.links[31].hostname);




// Shows the Alert
function showAlert() {

    window.alert("Working");
    console.log(top.document.links[31].hostname)
  }

// Removes the Alert
  function RemoveAlert() {
    
  }