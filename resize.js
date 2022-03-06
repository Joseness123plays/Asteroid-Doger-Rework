function Resize() {
    if(window.innerWidth<window.innerHeight){
        document.getElementById("Title").style.fontSize = `${5/100*window.innerWidth}px`
    }
    else{
        document.getElementById("Title").style.fontSize = `${5/100*window.innerHeight}px`
    }
}
Resize()
window.addEventListener('resize',Resize)