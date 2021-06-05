// Comment code out CTRL+K+C, uncomment CTRL+K+U
const exclusion = [];

//When the user clicks on the Window: All the functions will run again. 
document.addEventListener('click', WindowClick);

function WindowClick() {
    whichWebsite()
}

function whichWebsite() {
    if (document.URL.indexOf("https://mail.google.com/") >= 0) {
        //Run functions on Gmail
        gmailGetAllLinks()

    } else if (document.URL.indexOf("https://outlook.live.com/") >= 0) {
        //Run functions on Outlook
        outlookGetAllLinks()

    }
}

//Function to get all the links from Gmail
function gmailGetAllLinks() {
    const links = Array.from(document.querySelectorAll(".a3s a")).map(link => {
        if (link.href != "") {
            const url = new URL(link.href);
            return url.hostname
        }
    })

    //removes duplicate links
    var uniq = [...new Set(links)];
    //window.alert(uniq);
    

    // IF THE VALUE IS UNDEFINED, THE VALUE IS REMOVED!
    uniq.forEach(item => {

        if (typeof item === "undefined" || item === "") {
            const index = uniq.indexOf(item);
            uniq.splice(index, 1);
        } 
        // REMOVES WWW. from Domain links!
    uniq = uniq.map(x => x.replace("www.",""));
    })

    //return warningPopup(uniq);
    return jsonCompare(uniq);
}


//Function to get all the links from Outlook
function outlookGetAllLinks() {
    const links = Array.from(document.querySelectorAll(".wide-content-host a")).map(link => {
        if (link.href != "") {
            const url = new URL(link.href);
            return url.hostname
        }
        
    })

    //removes duplicate links
    var uniq = [...new Set(links)];

    // IF THE VALUE IS UNDEFINED, THE VALUE IS REMOVED!
    uniq.forEach(item => {

    if (typeof item === "undefined" || item === "") {
      const index = uniq.indexOf(item)
      uniq.splice(index, 1)  
  }
    // REMOVES WWW. from Domain links!
    uniq = uniq.map(x => x.replace("www.",""));
        

})
    

    //window.alert(uniq);
    //return warningPopup(uniq);
    return jsonCompare(uniq);
}


function jsonCompare(uniq) {
    var xmlhttp = new XMLHttpRequest();
    const urlJson = "https://raw.githubusercontent.com/AlexHughesOk/anti-phishing/main/json/trustedWebsites.json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonList = JSON.parse(this.responseText);

            // uniq = Website links from emails.
            // jsonList = JSON List FULL of Whitelisted websites.

            //Created array to hold all the differences.
            const differences = [];
            // Goes through the whole array of 'uniq' and put it into stringItem.
            uniq.forEach(stringItem => {
                //console.log(jsonList.indexOf(stringItem))
                // Checks each string of uniq against jsonList & will only push if there's no match. 
                if (jsonList.indexOf(stringItem) === -1 && exclusion.indexOf(stringItem) === -1)
                    differences.push(stringItem);
                                  
            });
            if (differences.length > 0)
                return warningPopup(differences);
                

        }
    };
    xmlhttp.open("GET", urlJson, true);
    xmlhttp.send();

}

function warningPopup(differences) {
    //EXTRA STYLING
    var defaultCss = document.createElement('style');
    defaultCss.setAttribute('type', 'text/css');
    var css = '';
    defaultCss.innerHTML = css;
    document.head.appendChild(defaultCss);

    // BODY OF POPUP
    var divAlert = document.createElement('divAlert');
    document.body.appendChild(divAlert);
    divAlert.id = 'warningAlert';
    divAlert.style.position = 'absolute';
    divAlert.style.top = '25px';
    divAlert.style.right = '25px';
    divAlert.style.borderRadius = '5px';
    divAlert.style.zIndex = '101';
    divAlert.style.fontFamily = 'Product Sans';
    divAlert.style.fontSize = '12px';
    divAlert.style.background = 'rgba(245, 245, 245)';;
    divAlert.style.maxHeight = '500px';
    divAlert.style.maxWidth = '500px';
    divAlert.style.height = '207px';
    divAlert.style.width = '260px';

    //HEADER

    var header = document.createElement('div');
    divAlert.appendChild(header);
    header.id = 'div-header';
    header.style.background = 'red';
    header.style.borderRadius = '5px';
    header.style.zIndex = '101';

    var img = document.createElement('img');
    img.src = 'https://raw.githubusercontent.com/AlexHughesOk/anti-phishing/main/assets/Logo48.png';
    img.style.display = 'block';
    img.style.marginLeft = 'auto';
    img.style.marginRight = 'auto';
    //img.style.background = 'red';
    header.appendChild(img);

    var imgText = document.createElement('div');
    header.appendChild(imgText);
    imgText.style.display = 'block';
    imgText.style.height = '22px';
    imgText.style.textAlign = 'center';
    imgText.style.color = 'white';
    imgText.style.fontFamily = 'Trebuchet MS';
    imgText.style.fontSize = '14px';
    imgText.innerHTML = "Warning Potential Phishing Links!";

    //BODY 

    var body = document.createElement('div');
    divAlert.appendChild(body);
    body.id = 'div-body';
    body.style.height = '80px';
    //body.style.background = 'pink';

    var phishingLinks = document.createElement('div');
    body.appendChild(phishingLinks);
    phishingLinks.style.height = '76px';
    phishingLinks.style.marginTop = '10px';
    phishingLinks.style.marginLeft = '20px';
    phishingLinks.style.width = '234px';
    phishingLinks.style.fontFamily = 'Trebuchet MS';
    phishingLinks.style.fontSize = '13px';
    phishingLinks.style.overflowY = 'Scroll'
    console.log(differences.length)
    for (var i=0; i<differences.length; i++){
        phishingLinks.innerHTML += differences[i] + "<br>";
    }
    
    //FOOTER

    var footer = document.createElement('div');
    divAlert.appendChild(footer);
    footer.id = 'div-footer';

    var cancelButton = document.createElement('button');
    footer.appendChild(cancelButton);
    cancelButton.innerHTML = 'Close';
    cancelButton.style.width = '100px';
    cancelButton.style.padding = '10px 0';
    cancelButton.style.cssFloat = 'right';
    cancelButton.style.marginRight = '10px';
    cancelButton.onclick = function(e) {
        divAlert.parentNode.removeChild(divAlert);
        UpdateExclusionList(differences);
    };
    var safeButton = document.createElement('button');
    footer.appendChild(safeButton);
    safeButton.innerHTML = 'Safe Email!';
    safeButton.style.width = '100px';
    safeButton.style.padding = '10px 0';
    safeButton.style.cssFloat = 'left';
    safeButton.style.marginLeft = '10px';
    safeButton.style.background = 'rgba(43, 189, 75)';
}

function UpdateExclusionList(siteLists) {
    console.log(siteLists);
    console.log(exclusion)
    console.log("///");
    siteLists.forEach(s => exclusion.push(s))
    console.log(exclusion)
}