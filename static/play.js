var currentrow = 1;
var currentbox = 1;
var trynumber = 5;
var word = "Apple"
var correct = 0
const green = "#1aae9f"
const gray = "#788896"
const yellow = "#f7c325"
const doc = document
const back = doc.getElementById("back-button")


function clear_row() {
    var row = document.getElementById("row "+currentrow);
    var children = row.childNodes;
    var b = 0   
    for (var i = 0; i < children.length; i++) {
        if (children[i].style != undefined) {
            children[i].innerHTML = ""
            b++
        }
    } 
}

function color(tocolor) {
    var row = document.getElementById("row "+currentrow);
    var children = row.childNodes;
    var b = 0   
    for (var i = 0; i < children.length; i++) {
        if (children[i].style != undefined) {
            children[i].style.backgroundColor = tocolor
            b++
        }
    } 
    if (tocolor == "red") {
        setTimeout(function(){
            color("white");
        }, 1000);
    }    
}
async function getword() {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify("Hey, i need a word")
      };
      const res = await fetch("/api/word", requestOptions);
      response = await res.json();
      word = response
    } catch (error) {
      console.error('Error:', error);
    }
}

getword()
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
    trynumber = cookie
} else {
    document.cookie = "try=5"
    trynumber = 5
}


function win() {
    document.cookie = "word="+word;
    document.cookie = "trys="+(currentrow-1);
    window.location.pathname = '/win'
}
function loose() {
    document.cookie = "word="+word;
    document.cookie = "trys="+(currentrow-1);
    window.location.pathname = '/loose'
}

function getcolor(i,letter) {
    if (word[i].toUpperCase()==letter.toUpperCase()) {
        correct++
        return green
    }
    else if(word.toUpperCase().includes(letter.toUpperCase())) {
        return yellow
    }
    else {
        return gray
    }
}

function colorrow() {
    var row = document.getElementById("row "+currentrow);
    var children = row.childNodes;
    var b = 0   
    for (var i = 0; i < children.length; i++) {
        if (children[i].style != undefined) {
            var color = getcolor(b,children[i].innerHTML)
            children[i].style.backgroundColor = color
            b++
        }
    }    
    if (correct == 5){
        setTimeout(function(){
            win();
        }, 1000);
    }
    correct = 0
}

function createrows() {
    var originalDiv = document.getElementById("row 1");
    var parentElement = document.getElementById("row 1")
    for (var a = trynumber; a >= 2; a=a-1) {
        var newDiv = document.createElement('div');
        var originalDivId = originalDiv.getAttribute('id');
        newDiv.setAttribute('id', "row "+a);
        newDiv.setAttribute("class","row")
        var children = originalDiv.childNodes;
        for (var i = 0; i < children.length; i++) {
            var childClone = children[i].cloneNode(true);
            childClone.innerHTML == " "
            newDiv.appendChild(childClone);
        }
        parentElement.insertAdjacentElement('afterend',newDiv);
    }
}    

async function check_request(currentword) {
    const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentword)
    };
    const res = await fetch("/api/check", requestOptions);
    return res
}
async function check() {
    var row = document.getElementById("row "+currentrow);
    var children = row.childNodes;
    var b = 0 
    var currentword = ""  
    for (var i = 0; i < children.length; i++) {
        if (children[i].style != undefined) {
            currentword = currentword + children[i].innerHTML
            b++
        }
    }    
    try {
          const res = await check_request(currentword)
          var status = await res.status
          if (status == 200) {
            currentbox = 1
            colorrow()
            currentrow++
            if (currentrow>trynumber) {
                setTimeout(function(){
                    loose();
                }, 1500);
            }
            document.getElementById("row "+(currentrow-1)).getElementsByClassName("box 5")[0].style.border = "";  
            document.getElementById("row "+ currentrow).getElementsByClassName("box 1")[0].style.borderColor = "white";
            document.getElementById("row "+ currentrow).getElementsByClassName("box 1")[0].style.border = "solid";         
          } else {
            color("red")
            setTimeout(function(){
                clear_row();
                currentbox = 1
                document.getElementById("row "+ currentrow).getElementsByClassName("box 5")[0].style.border = "";
                document.getElementById("row "+ currentrow).getElementsByClassName("box 1")[0].style.borderColor = "white";
                document.getElementById("row "+ currentrow).getElementsByClassName("box 1")[0].style.border = "solid";
            }, 1000);
           }
    } catch (error) {
        color("red")
        setTimeout(function(){
            clear_row();
            currentbox = 1
            document.getElementById("row "+ currentrow).getElementsByClassName("box 5")[0].style.borderColor = "white";
            document.getElementById("row "+ currentrow).getElementsByClassName("box 5")[0].style.border = "solid";
            document.getElementById("row "+ currentrow).getElementsByClassName("box 1")[0].style.borderColor = "white";
            document.getElementById("row "+ currentrow).getElementsByClassName("box 1")[0].style.border = "solid";
        }, 1000);
    }
}

createrows()
document.getElementById("row 1").getElementsByClassName("box 1")[0].style.borderColor = "white";
document.getElementById("row 1").getElementsByClassName("box 1")[0].style.border = "solid";
document.addEventListener('keydown', function(evt) {
    if (evt.key == "Backspace") {
        var targetDiv = document.getElementById("row " + currentrow).getElementsByClassName("box " + currentbox)[0];
        if (targetDiv.innerHTML === " ") {
            if (currentbox > 1) {
             currentbox = currentbox -1
             document.getElementById("row "+currentrow).getElementsByClassName("box " + currentbox)[0].innerHTML = " "
             targetDiv.style.border = "";
             document.getElementById("row "+currentrow).getElementsByClassName("box " + currentbox)[0].style.borderColor = "white";
             document.getElementById("row "+currentrow).getElementsByClassName("box " + currentbox)[0].style.border = "solid";
            }
        }else{
        targetDiv.innerHTML = " "
        }
    }else {

  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  charStr = charStr.toUpperCase();
  var targetDiv = document.getElementById("row " + currentrow).getElementsByClassName("box " + currentbox)[0];
  targetDiv.innerHTML = charStr
  currentbox++
  if (currentbox>5) {
    check()
  } else {
     document.getElementById("row "+currentrow).getElementsByClassName("box " + currentbox)[0].style.borderColor = "white";
    document.getElementById("row "+currentrow).getElementsByClassName("box " + currentbox)[0].style.border = "solid";
    document.getElementById("row "+currentrow).getElementsByClassName("box " + (currentbox-1))[0].style.border = "";
  }
}
});

back.onclick = function() {
    window.location.pathname = '/'
}