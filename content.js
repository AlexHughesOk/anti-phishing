// Comment code out CTRL+K+C, uncomment CTRL+K+U
const exclusion = [];

//Removes Alert if clicked
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
    const uniq = [...new Set(links)];
    //window.alert(uniq);

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
    const uniq = [...new Set(links)];
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
    // Prints the Array of Links - uniq

    // Styling to Array of Links 
    var styledPopup = "";
    differences.forEach((d, index) => {
        if (index > 0)
            styledPopup += ", "
        styledPopup += typeof d == "undefined" ? "" : d.replace(",", "");
    })

    phishingWebsites.innerHTML = differences;

    divAlert.appendChild(phishingWebsites);

    //Cancel Button
    var cancel = document.createElement('div');
    cancel.innerHTML = 'close';
    cancel.onclick = function(e) {
        divAlert.parentNode.removeChild(divAlert);
        UpdateExclusionList(differences);
    };

    divAlert.appendChild(cancel);
}

function UpdateExclusionList(siteLists) {
    console.log(siteLists);
    console.log(exclusion)
    console.log("///");
    siteLists.forEach(s => exclusion.push(s))
    console.log(exclusion)
}