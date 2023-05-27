const doc = document
const play = doc.getElementById("play")
const config = doc.getElementById("config")

play.onclick = function() {
    window.location.pathname = '/play'
}

config.onclick = function() {
    window.location.pathname = '/config'
}
