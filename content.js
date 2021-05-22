// Comment code out CTRL+K+C, uncomment CTRL+K+U

// var intervalId = -1;

//Removes Alert if clicked
// document.addEventListener('click', WindowClick);
// function WindowClick() {

//   getAllLink()
// }

if(document.URL.indexOf("https://mail.google.com/") >= 0){ 
  //Run functions on Gmail
  gmailGetAllLinks()

  }
else if(document.URL.indexOf("https://outlook.live.com/") >= 0) {
  //Run functions on Outlook
  
}



// https://stackoverflow.com/questions/27590366/how-to-get-all-links-in-a-page-by-classname-and-store 
function gmailGetAllLinks(){
  var classname = document.getElementsByClassName('AO');
  var array1 = [];
  for(i=0;i<classname.length;i++){
      var str = classname[i].getElementsByTagName('a')[0].href;
      var res = str.split("?"); 
      array1.push(res[0]);

  }
  //console.log(array1);
  //window.alert(array1)
  warningPopup()
}


function warningPopup () {
  var defaultCss = document.createElement('style');
  defaultCss.setAttribute('type', 'text/css');
  var css = '';

  defaultCss.innerHTML = css;
  document.head.appendChild(defaultCss);
  var divAlert = document.createElement('div');
  divAlert.innerHTML = "Warning this email could be dangerous!";

  // CSS for the shape of the box
  document.body.appendChild(divAlert);
  divAlert.id = 'warningAlert';
  divAlert.style.position = 'absolute';
  divAlert.style.top = '25px';
  divAlert.style.right = '25px';
  divAlert.style.background = 'rgba(255, 0, 0)';
  divAlert.style.borderRadius = '5px';
  divAlert.style.zIndex = '101';
  divAlert.style.padding = '15px';
  divAlert.style.fontFamily = 'Product Sans';
  divAlert.style.fontSize = '12px';

  var phishingWebsites = document.createElement('div');
 // phishingWebsites.innerHTML = PHISHING VAR GOES HERE;
  divAlert.appendChild(phishingWebsites);

  //Cancel Button
  var cancel = document.createElement('div');
  cancel.innerHTML = 'close';
  cancel.onclick = function (e) { divAlert.parentNode.removeChild(divAlert) };                                  
  divAlert.appendChild(cancel);
}


// Shows the Alert
function showAlert() {

    window.alert("Working");
  }

// Removes the Alert
  function RemoveAlert() {
  }
