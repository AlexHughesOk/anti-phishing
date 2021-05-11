// Comment code out CTRL+K+C, uncomment CTRL+K+U

var intervalId = -1;

//Removes Alert if clicked
document.addEventListener('click', WindowClick);
function WindowClick() {

  getAllLink()
}




// https://stackoverflow.com/questions/27590366/how-to-get-all-links-in-a-page-by-classname-and-store 

function getAllLink(){
  var class1 = document.getElementsByClassName('AO');
  var array1 = [];
  for(i=0;i<class1.length;i++){
      var str = class1[i].getElementsByTagName('a')[0].href;
      var res = str.split("?"); 
      array1.push(res[0]);
  }
  //console.log(array1);
  window.alert(array1)
}

//https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string

function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}





// Shows the Alert
function showAlert() {

    window.alert("Working");
  }

// Removes the Alert
  function RemoveAlert() {
  }
