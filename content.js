// Comment code out CTRL+K+C, uncomment CTRL+K+U

// var intervalId = -1;

//Removes Alert if clicked
document.addEventListener('click', WindowClick);
function WindowClick() {

 gmailGetAllLinks()
}

if(document.URL.indexOf("https://mail.google.com/") >= 0){ 
 //Run functions on Gmail
 gmailGetAllLinks()

 }
else if(document.URL.indexOf("https://outlook.live.com/") >= 0) {
 //Run functions on Outlook
 
}


function gmailGetAllLinks(){
 const links = Array.from(document.querySelectorAll(".a3s a")).map(link => {
     const url = new URL(link.href);
     return url.hostname
    
 })
 //removes duplicate links
 const uniq = [...new Set(links)];
 //window.alert(uniq);
 return warningPopup(uniq);
}



function warningPopup (uniq) {

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
 // Prints the Array of Links
 phishingWebsites.innerHTML = uniq;
 divAlert.appendChild(phishingWebsites);

 //Cancel Button
 var cancel = document.createElement('div');
 cancel.innerHTML = 'close';
 cancel.onclick = function (e) { divAlert.parentNode.removeChild(divAlert) };                                  
 divAlert.appendChild(cancel);
}

// Removes the Alert
 function RemoveAlert() {
 }
