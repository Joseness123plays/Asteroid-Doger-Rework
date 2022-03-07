function Resize() {
    let SCALE
    if(window.innerWidth<window.innerHeight){
        SCALE = window.innerWidth
    }
    else{
        SCALE = window.innerHeight
    }
    document.getElementById("InnerTitle").style.fontSize = `${5/100*SCALE}px`
    document.getElementById("InnerTitle").style.width = `${50/100*SCALE}px`
    document.getElementById('InnerTitle').style.left = `${(window.innerWidth/2)-(50/100*SCALE/2)}px`
    document.getElementById('InnerTitle').style.top = `${(10/100*window.innerHeight/2)-(5/100*SCALE/1.5)}px`
}
//1280
//720
//document.getElementById('Stats1').style.left = (window.innerWidth / 2) - (CanvasWidth / 2) + 'px'
Resize()
window.addEventListener('resize',Resize)