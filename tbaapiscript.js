var key = "sx6QV9xPH8OQRY11K4luiXbAal6ewdXTQBjiPW3BkivVRRYDBiEyD5K1U5jbq1hH"; 
var url_root = "https://www.thebluealliance.com/api/v3/";
var default_path = "team/frc2122"
document.getElementById("custom_url").placeholder = default_path;
function accessAPI(){ 
    var xmlHttp = new XMLHttpRequest();
    var url = url_root+default_path;
    var ev = document.getElementById("custom_url").value
    if(ev.length>0) {
        url = url_root+ev;
    }
    try {
    xmlHttp.open("GET", url, false);
    xmlHttp.setRequestHeader("X-TBA-Auth-Key", key);
        xmlHttp.send(null);
    } catch (e) { return undefined; }
    var data = xmlHttp.responseText;
    return data;
}
document.getElementById("update").onclick = function() {
    var data = accessAPI();
    if(data===undefined) {
        dispStr = "This field does not exist";
    } else 
    data = JSON.parse(data);
    console.log(data);
    var dispStr = "";
    for(var i in data) {
        dispStr += "<span class=\"data-key\">" + i + "</span>: <span class=\"data-value\">" + data[i] + "</span><br>";
    }
    if(dispStr.length===0) {
        dispStr = "This field exists but is empty";
    }
    document.getElementById("data").innerHTML = dispStr;
    var prop = document.getElementById("custom_property").value;
    console.log(prop);
    if(prop.length>0) {
        document.getElementById("property_output").innerHTML = ">> " + prop+": "+data[prop];
    }
}
document.getElementById("custom_property").onchange = function() {
    document.getElementById("update").click();
}
document.getElementById("custom_url").onchange = function() {
    document.getElementById("update").click();
}