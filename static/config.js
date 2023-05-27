const doc = document
const back = doc.getElementById("back-button")

back.onclick = function() {
    window.location.pathname = '/'
}

document.getElementById("Trys").addEventListener("input", function() {
    createCookie()
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

var cookie = getCookie("try")

if (cookie!="") {
    document.getElementById("Trys").value = cookie
} else {
    document.cookie = "try=5"
    document.getElementById("Trys").value = 5
}

function createCookie() {
    var inputValue = document.getElementById("Trys").value;
    if (inputValue > 0 && inputValue < 8) {
      console.log(inputValue)
      document.cookie = "try=" + inputValue;
    } else {
      alert("Input value should be greater than 0 and less than 8.");
    }
  }