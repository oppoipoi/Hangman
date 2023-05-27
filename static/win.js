const doc = document
const play = doc.getElementById("play")
const win = doc.getElementById("win")

play.onclick = function() {
    window.location.pathname = '/play'
}


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

win.innerHTML = "You won !! <br/><br/> Your word was: "+getCookie("word")+" <br/><br/> You made it in "+getCookie("trys")+" trys !"